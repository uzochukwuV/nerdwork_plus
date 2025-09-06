import * as fs from "fs";
import { eq, and } from "drizzle-orm";
import { mplCore, create, createCollection, fetchCollection, fetchAsset, transfer, } from "@metaplex-foundation/mpl-core";
import { createSignerFromKeypair, signerIdentity, generateSigner, publicKey, } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import * as multer from "multer"
import { userWallets, walletAddresses } from "../model/schema";
import { db } from "../config/db";
import multer from "multer";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { nft } from "../model/nft";
const umi = createUmi("http://api.devnet.solana.com")
    .use(mplCore())
    .use(irysUploader());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
export const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."));
        }
    },
});
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
// Set up signer from private key
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([
    52, 52, 212, 166, 63, 87, 120, 139, 26, 57, 91, 117, 243, 1, 251, 111, 227,
    73, 73, 73, 230, 55, 67, 121, 81, 198, 187, 204, 217, 81, 252, 158, 132, 41,
    222, 69, 230, 97, 134, 202, 186, 91, 158, 218, 90, 105, 179, 241, 113, 204,
    215, 39, 54, 158, 233, 66, 129, 141, 95, 31, 203, 109, 193, 83,
]));
console.log(keypair);
const masterWallet = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(masterWallet));
// Database helper functions
async function getUserWalletByUserId(userProfileId) {
    const result = await db
        .select()
        .from(userWallets)
        .where(eq(userWallets.userProfileId, userProfileId));
    return result[0];
}
async function getUserSolanaAddress(userWalletId) {
    const result = await db
        .select()
        .from(walletAddresses)
        .where(and(eq(walletAddresses.userWalletId, userWalletId), eq(walletAddresses.blockchain, "solana"), eq(walletAddresses.isVerified, true)));
    return result[0];
}
async function getUserPrimarySolanaAddress(userWalletId) {
    const result = await db
        .select()
        .from(walletAddresses)
        .where(and(eq(walletAddresses.userWalletId, userWalletId), eq(walletAddresses.blockchain, "solana"), eq(walletAddresses.isPrimary, true), eq(walletAddresses.isVerified, true)));
    return result[0] || (await getUserSolanaAddress(userWalletId));
}
// Helper function to upload metadata
async function uploadMetadata(imageFile, metadata) {
    try {
        // Upload image first
        const imageBuffer = fs.readFileSync(imageFile.path);
        const genericFile = {
            buffer: imageBuffer,
            fileName: imageFile.originalname || imageFile.filename || "image",
            displayName: imageFile.originalname || imageFile.filename || "image",
            uniqueName: Date.now() +
                "-" +
                (imageFile.originalname || imageFile.filename || "image"),
            contentType: imageFile.mimetype || "image/png",
            extension: (imageFile.originalname || imageFile.filename || "image")
                .split(".")
                .pop() || "png",
            tags: [],
        };
        const [imageUri] = await umi.uploader.upload([genericFile]);
        // Create metadata JSON
        const metadataJson = {
            name: metadata.name,
            description: metadata.description,
            image: imageUri,
            attributes: metadata.attributes || [],
            properties: {
                category: "image",
                creators: metadata.creators || [],
                ...metadata.properties,
            },
            // Comic-specific metadata
            comic: {
                issue: metadata.issue || 1,
                series: metadata.series || "",
                author: metadata.author || "",
                genre: metadata.genre || "",
                publishDate: metadata.publishDate || new Date().toISOString(),
                pages: metadata.pages || 1,
            },
        };
        // Upload metadata JSON
        const metadataUri = await umi.uploader.uploadJson(metadataJson);
        // Clean up uploaded file
        fs.unlinkSync(imageFile.path);
        return metadataUri;
    }
    catch (error) {
        // Clean up file on error
        if (fs.existsSync(imageFile.path)) {
            fs.unlinkSync(imageFile.path);
        }
        throw error;
    }
}
// API Roter
// Create a new collection
export const createApiCollection = async (req, res) => {
    try {
        const { name, description, image, userProfileId } = req.body;
        if (!name || !description || !image) {
            return res
                .status(400)
                .json({ error: "Name, description, and image URL are required" });
        }
        const metadataJson = {
            name,
            description,
            image,
            attributes: [],
            properties: {
                category: "image",
                creators: [
                    {
                        address: masterWallet.publicKey,
                        percentage: 100,
                    },
                ],
            },
        };
        const amount = {
            basisPoints: BigInt(9),
            identifier: "SOL",
            decimals: 9,
        };
        console.log(await umi.rpc.airdrop(masterWallet.publicKey, amount));
        const metadataUri = await umi.uploader.uploadJson(metadataJson);
        console.log(metadataUri);
        const collectionSigner = generateSigner(umi);
        await createCollection(umi, {
            collection: collectionSigner,
            name,
            uri: metadataUri,
        }).sendAndConfirm(umi);
        // add crea
        res.json({
            success: true,
            collectionId: collectionSigner.publicKey,
            message: "Collection created successfully",
        });
    }
    catch (error) {
        console.error("Collection creation error:", error);
        res
            .status(500)
            .json({ error: "Failed to create collection", details: error.message });
    }
};
let defaultCollection;
export const mintApiNFT = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }
        const { userProfileId, name, description, author, series, issue, genre, pages, publishDate, collectionId, attributes, transferImmediately = true, } = req.body;
        // Validate required fields
        if (!userProfileId || !name || !description) {
            return res
                .status(400)
                .json({ error: "userProfileId, name, and description are required" });
        }
        // Get user's wallet from database
        const userWallet = "await getUserWalletByUserId(userProfileId);";
        if (!userWallet) {
            return res.status(404).json({ error: "User wallet not found" });
        }
        // Get user's primary Solana address
        const userSolanaWallet = "await getUserPrimarySolanaAddress(userWallet.id);";
        if (!userSolanaWallet) {
            return res
                .status(404)
                .json({ error: "User has no verified Solana wallet address" });
        }
        // console.log(`Minting NFT for user ${userProfileId} to address ${userSolanaWallet.address}`);
        // Parse attributes if provided
        let parsedAttributes = [];
        if (attributes) {
            try {
                parsedAttributes = JSON.parse(attributes);
            }
            catch (error) {
                return res.status(400).json({ error: "Invalid attributes format" });
            }
        }
        // Add comic-specific attributes
        const comicAttributes = [
            { trait_type: "Author", value: author || "Unknown" },
            { trait_type: "Series", value: series || "Standalone" },
            { trait_type: "Issue", value: issue || "1" },
            { trait_type: "Genre", value: genre || "Comic" },
            { trait_type: "Pages", value: pages || "1" },
            { trait_type: "Platform", value: "YourPlatformName" },
            { trait_type: "Minted By", value: "Platform" },
            ...parsedAttributes,
        ];
        // Prepare metadata
        const metadata = {
            name,
            description,
            author,
            series,
            issue,
            genre,
            pages,
            publishDate,
            attributes: comicAttributes,
            creators: [
                {
                    address: masterWallet.publicKey,
                    percentage: 100,
                },
            ],
        };
        // Upload metadata
        const metadataUri = await uploadMetadata(req.file, metadata);
        // Generate asset signer
        const assetSigner = generateSigner(umi);
        // Prepare mint parameters (initially mint to master wallet)
        const mintParams = {
            asset: assetSigner,
            name,
            uri: metadataUri,
            owner: masterWallet.publicKey, // Mint to master wallet first
        };
        // Add collection if specified
        if (collectionId) {
            try {
                const collection = await fetchCollection(umi, publicKey(collectionId));
                mintParams["collection"] = collection;
            }
            catch (error) {
                console.log("Collection not found, minting without collection");
            }
        }
        // const userPublicKey = publicKey(userSolanaWallet.address)
        // Add royalties plugin (platform gets royalties)
        mintParams["plugins"] = [
            {
                type: "Royalties",
                basisPoints: 500, // 5% royalty to platform
                creators: [
                    {
                        address: masterWallet.publicKey,
                        percentage: 100,
                    },
                ],
                ruleSet: { type: "None" },
            },
        ];
        // Create the asset
        console.log("Creating NFT...");
        const createResult = await create(umi, mintParams).sendAndConfirm(umi);
        //save nft to database
        await db.insert(nft).values({
            owner: userWallet, // UUID from the user wallet
            colection: collectionId ?? "standalone", // optional or default string
            isLimitedEdition: false, // or true if it's a limited edition
            amount: 1, // assume 1 NFT minted
            metadata: {
                name,
                description,
                author,
                image: req.file.path,
                uri: metadataUri,
                assetId: assetSigner.publicKey,
                attributes: comicAttributes,
                mintSignature: createResult.signature,
            },
            status: "completed", // or 'pending' if there's more flow
        });
        let transferResult = null;
        // Transfer to user immediately if requested
        // if (transferImmediately) {
        //   console.log('Transferring NFT to user...');
        //   try {
        //    if (collectionId){
        //      transferResult = await transferV1(umi, {
        //       asset: assetSigner.publicKey,
        //       newOwner: publicKey(userSolanaWallet.address),
        //     }).sendAndConfirm(umi);
        //    }else{
        //      transferResult = await transferV1(umi, {
        //       asset: assetSigner.publicKey,
        //       newOwner: publicKey(userSolanaWallet.address),
        //       collection: collectionId
        //     }).sendAndConfirm(umi);
        //    }
        //   } catch (transferError) {
        //     console.error('Transfer failed:', transferError);
        //     // NFT was minted but transfer failed - you might want to handle this differently
        //     return res.status(500).json({
        //       error: 'NFT minted but transfer failed',
        //       details: transferError.message,
        //       assetId: assetSigner.publicKey,
        //       mintSignature: createResult.signature,
        //       metadataUri
        //     });
        //   }
        // }
        // Log the transaction for your records
        console.log(`NFT minted successfully:
      Asset ID: ${assetSigner.publicKey}
      User: ${userProfileId}
      User Wallet: ${userSolanaWallet}
      Mint Signature: ${createResult.signature}
      Transfer Signature: ${transferResult?.signature || "N/A"}
    `);
        res.json({
            success: true,
            assetId: assetSigner.publicKey,
            mintSignature: createResult.signature,
            transferSignature: transferResult?.signature,
            metadataUri,
            // userWalletAddress: userSolanaWallet.address,
            transferred: transferImmediately,
            message: transferImmediately
                ? "Comic NFT minted and transferred to user successfully"
                : "Comic NFT minted successfully (transfer pending)",
        });
    }
    catch (error) {
        console.error("Minting error:", error);
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            error: "Failed to mint NFT",
            details: error.message,
        });
    }
};
// Get NFT details
export const getAssetData = async (req, res) => {
    try {
        const { assetId } = req.params;
        const asset = await fetchAsset(umi, publicKey(assetId));
        res.json({
            success: true,
            asset: {
                id: asset.publicKey,
                name: asset.name,
                uri: asset.uri,
                owner: asset.owner,
                updateAuthority: asset.updateAuthority,
                plugins: asset["plugins"] || null,
            },
        });
    }
    catch (error) {
        console.error("Fetch error:", error);
        res
            .status(500)
            .json({ error: "Failed to fetch NFT", details: error.message });
    }
};
// Get NFTs by owner
export const getAssetByOwner = async (req, res) => {
    try {
        const { userProfileId } = req.params;
        // Get user's wallet from database
        const userWallet = await getUserWalletByUserId(userProfileId);
        if (!userWallet) {
            return res.status(404).json({ error: "User wallet not found" });
        }
        // Get all user's Solana addresses
        const userAddresses = await db
            .select()
            .from(walletAddresses)
            .where(and(eq(walletAddresses.userWalletId, userWallet.id), eq(walletAddresses.blockchain, "solana"), eq(walletAddresses.isVerified, true)));
        if (userAddresses.length === 0) {
            return res.json({ success: true, assets: [] });
        }
        // Fetch NFTs for all user addresses
        const allAssets = [];
        for (const address of userAddresses) {
            try {
                const { fetchAssetsByOwner } = require("@metaplex-foundation/mpl-core");
                const assets = await fetchAssetsByOwner(umi, publicKey(address.address));
                allAssets.push(...assets);
            }
            catch (error) {
                console.error(`Failed to fetch assets for address ${address.address}:`, error);
            }
        }
        res.json({
            success: true,
            assets: allAssets.map((asset) => ({
                id: asset.publicKey,
                name: asset.name,
                uri: asset.uri,
                owner: asset.owner,
                updateAuthority: asset.updateAuthority,
            })),
        });
    }
    catch (error) {
        console.error("Fetch user NFTs error:", error);
        res.status(500).json({
            error: "Failed to fetch user NFTs",
            details: error.message,
        });
    }
};
export const transferNft = async (req, res) => {
    try {
        const { assetId, userProfileId } = req.body;
        if (!assetId || !userProfileId) {
            return res
                .status(400)
                .json({ error: "assetId and userProfileId are required" });
        }
        // Get user's wallet from database
        const userWallet = await getUserWalletByUserId(userProfileId);
        if (!userWallet) {
            return res.status(404).json({ error: "User wallet not found" });
        }
        // Get user's primary Solana address
        const userSolanaWallet = await getUserPrimarySolanaAddress(userWallet.id);
        if (!userSolanaWallet) {
            return res
                .status(404)
                .json({ error: "User has no verified Solana wallet address" });
        }
        // Verify the asset exists and is owned by master wallet
        const asset = await fetchAsset(umi, publicKey(assetId));
        if (asset.owner !== masterWallet.publicKey) {
            return res
                .status(400)
                .json({ error: "Asset is not owned by platform wallet" });
        }
        // Transfer the asset
        const transferResult = await transfer(umi, {
            asset: publicKey(assetId),
            newOwner: publicKey(userSolanaWallet.address),
        }).sendAndConfirm(umi);
        res.json({
            success: true,
            assetId,
            transferSignature: transferResult.signature,
            userWalletAddress: userSolanaWallet.address,
            message: "NFT transferred to user successfully",
        });
    }
    catch (error) {
        console.error("Transfer error:", error);
        res.status(500).json({
            error: "Failed to transfer NFT",
            details: error.message,
        });
    }
};
export const getPlatformNFTs = async (req, res) => {
    try {
        const { fetchAssetsByOwner } = require("@metaplex-foundation/mpl-core");
        const assets = await fetchAssetsByOwner(umi, masterWallet.publicKey);
        res.json({
            success: true,
            assets: assets.map((asset) => ({
                id: asset.publicKey,
                name: asset.name,
                uri: asset.uri,
                owner: asset.owner,
                updateAuthority: asset.updateAuthority,
            })),
        });
    }
    catch (error) {
        console.error("Fetch platform NFTs error:", error);
        res.status(500).json({
            error: "Failed to fetch platform NFTs",
            details: error.message,
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUV6QixPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFVBQVUsRUFFVixRQUFRLEdBRVQsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGNBQWMsRUFDZCxjQUFjLEVBQ2QsU0FBUyxHQUNWLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBR3JFLG1DQUFtQztBQUNuQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFbEMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRW5DLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQztLQUNsRCxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDZCxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUV2QixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2pDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDN0IsRUFBRSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsUUFB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Q0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRSxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ1AsT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDN0IsRUFBRSxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUNuQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLLENBQUMsZUFBZTthQUN2QyxDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsS0FBSyxFQUFFLCtCQUErQjtZQUN0QyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5cclxuaW1wb3J0IHsgZXEsIGFuZCB9IGZyb20gXCJkcml6emxlLW9ybVwiO1xyXG5pbXBvcnQge1xyXG4gIG1wbENvcmUsXHJcbiAgY3JlYXRlLFxyXG4gIGNyZWF0ZUNvbGxlY3Rpb24sXHJcbiAgZmV0Y2hDb2xsZWN0aW9uLFxyXG4gIGZldGNoQXNzZXQsXHJcbiAgZmV0Y2hBc3NldHNCeU93bmVyLFxyXG4gIHRyYW5zZmVyLFxyXG4gIHRyYW5zZmVyVjEsXHJcbn0gZnJvbSBcIkBtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlU2lnbmVyRnJvbUtleXBhaXIsXHJcbiAgc2lnbmVySWRlbnRpdHksXHJcbiAgZ2VuZXJhdGVTaWduZXIsXHJcbiAgcHVibGljS2V5LFxyXG59IGZyb20gXCJAbWV0YXBsZXgtZm91bmRhdGlvbi91bWlcIjtcclxuaW1wb3J0IHsgY3JlYXRlVW1pIH0gZnJvbSBcIkBtZXRhcGxleC1mb3VuZGF0aW9uL3VtaS1idW5kbGUtZGVmYXVsdHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlVW1pIGFzIGNyZWF0ZVRlc3RVbWkgfSBmcm9tIFwiQG1ldGFwbGV4LWZvdW5kYXRpb24vdW1pLWJ1bmRsZS10ZXN0c1wiO1xyXG5cclxuLy8gaW1wb3J0ICogYXMgbXVsdGVyIGZyb20gXCJtdWx0ZXJcIlxyXG5pbXBvcnQgeyB1c2VyV2FsbGV0cywgd2FsbGV0QWRkcmVzc2VzIH0gZnJvbSBcIi4uL21vZGVsL3NjaGVtYVwiO1xyXG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuLi9jb25maWcvZGJcIjtcclxuaW1wb3J0IHsgbWVtb3J5U3RvcmFnZSB9IGZyb20gXCJtdWx0ZXJcIjtcclxuaW1wb3J0IG11bHRlciBmcm9tIFwibXVsdGVyXCI7XHJcbmltcG9ydCB7IGlyeXNVcGxvYWRlciB9IGZyb20gXCJAbWV0YXBsZXgtZm91bmRhdGlvbi91bWktdXBsb2FkZXItaXJ5c1wiO1xyXG5pbXBvcnQgeyBuZnQgfSBmcm9tIFwiLi4vbW9kZWwvbmZ0XCI7XHJcblxyXG5jb25zdCB1bWkgPSBjcmVhdGVVbWkoXCJodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tXCIpXHJcbiAgLnVzZShtcGxDb3JlKCkpXHJcbiAgLnVzZShpcnlzVXBsb2FkZXIoKSk7XHJcblxyXG5jb25zdCBzdG9yYWdlID0gbXVsdGVyLmRpc2tTdG9yYWdlKHtcclxuICBkZXN0aW5hdGlvbjogKHJlcSwgZmlsZSwgY2IpID0+IHtcclxuICAgIGNiKG51bGwsIFwidXBsb2Fkcy9cIik7XHJcbiAgfSxcclxuICBmaWxlbmFtZTogKHJlcSwgZmlsZSwgY2IpID0+IHtcclxuICAgIGNiKG51bGwsIERhdGUubm93KCkgKyBcIi1cIiArIGZpbGUub3JpZ2luYWxuYW1lKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGxvYWQgPSBtdWx0ZXIoe1xyXG4gIHN0b3JhZ2U6IHN0b3JhZ2UsXHJcbiAgbGltaXRzOiB7IGZpbGVTaXplOiA1MCAqIDEwMjQgKiAxMDI0IH0sIC8vIDUwTUIgbGltaXRcclxuICBmaWxlRmlsdGVyOiAocmVxLCBmaWxlLCBjYikgPT4ge1xyXG4gICAgY29uc3QgYWxsb3dlZFR5cGVzID0gW1wiaW1hZ2UvanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL2dpZlwiLCBcImltYWdlL3dlYnBcIl07XHJcbiAgICBpZiAoYWxsb3dlZFR5cGVzLmluY2x1ZGVzKGZpbGUubWltZXR5cGUpKSB7XHJcbiAgICAgIGNiKG51bGwsIHRydWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2IoXHJcbiAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgXCJJbnZhbGlkIGZpbGUgdHlwZS4gT25seSBKUEVHLCBQTkcsIEdJRiwgYW5kIFdlYlAgYXJlIGFsbG93ZWQuXCJcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5pZiAoIWZzLmV4aXN0c1N5bmMoXCJ1cGxvYWRzXCIpKSB7XHJcbiAgZnMubWtkaXJTeW5jKFwidXBsb2Fkc1wiKTtcclxufVxyXG5cclxuLy8gU2V0IHVwIHNpZ25lciBmcm9tIHByaXZhdGUga2V5XHJcbmNvbnN0IGtleXBhaXIgPSB1bWkuZWRkc2EuY3JlYXRlS2V5cGFpckZyb21TZWNyZXRLZXkoXHJcbiAgbmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgNTIsIDUyLCAyMTIsIDE2NiwgNjMsIDg3LCAxMjAsIDEzOSwgMjYsIDU3LCA5MSwgMTE3LCAyNDMsIDEsIDI1MSwgMTExLCAyMjcsXHJcbiAgICA3MywgNzMsIDczLCAyMzAsIDU1LCA2NywgMTIxLCA4MSwgMTk4LCAxODcsIDIwNCwgMjE3LCA4MSwgMjUyLCAxNTgsIDEzMiwgNDEsXHJcbiAgICAyMjIsIDY5LCAyMzAsIDk3LCAxMzQsIDIwMiwgMTg2LCA5MSwgMTU4LCAyMTgsIDkwLCAxMDUsIDE3OSwgMjQxLCAxMTMsIDIwNCxcclxuICAgIDIxNSwgMzksIDU0LCAxNTgsIDIzMywgNjYsIDEyOSwgMTQxLCA5NSwgMzEsIDIwMywgMTA5LCAxOTMsIDgzLFxyXG4gIF0pXHJcbik7XHJcbmNvbnNvbGUubG9nKGtleXBhaXIpO1xyXG5jb25zdCBtYXN0ZXJXYWxsZXQgPSBjcmVhdGVTaWduZXJGcm9tS2V5cGFpcih1bWksIGtleXBhaXIpO1xyXG51bWkudXNlKHNpZ25lcklkZW50aXR5KG1hc3RlcldhbGxldCkpO1xyXG5cclxuLy8gRGF0YWJhc2UgaGVscGVyIGZ1bmN0aW9uc1xyXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyV2FsbGV0QnlVc2VySWQodXNlclByb2ZpbGVJZCkge1xyXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRiXHJcbiAgICAuc2VsZWN0KClcclxuICAgIC5mcm9tKHVzZXJXYWxsZXRzKVxyXG4gICAgLndoZXJlKGVxKHVzZXJXYWxsZXRzLnVzZXJQcm9maWxlSWQsIHVzZXJQcm9maWxlSWQpKTtcclxuICByZXR1cm4gcmVzdWx0WzBdO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyU29sYW5hQWRkcmVzcyh1c2VyV2FsbGV0SWQpIHtcclxuICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYlxyXG4gICAgLnNlbGVjdCgpXHJcbiAgICAuZnJvbSh3YWxsZXRBZGRyZXNzZXMpXHJcbiAgICAud2hlcmUoXHJcbiAgICAgIGFuZChcclxuICAgICAgICBlcSh3YWxsZXRBZGRyZXNzZXMudXNlcldhbGxldElkLCB1c2VyV2FsbGV0SWQpLFxyXG4gICAgICAgIGVxKHdhbGxldEFkZHJlc3Nlcy5ibG9ja2NoYWluLCBcInNvbGFuYVwiKSxcclxuICAgICAgICBlcSh3YWxsZXRBZGRyZXNzZXMuaXNWZXJpZmllZCwgdHJ1ZSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICByZXR1cm4gcmVzdWx0WzBdO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRVc2VyUHJpbWFyeVNvbGFuYUFkZHJlc3ModXNlcldhbGxldElkKSB7XHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGJcclxuICAgIC5zZWxlY3QoKVxyXG4gICAgLmZyb20od2FsbGV0QWRkcmVzc2VzKVxyXG4gICAgLndoZXJlKFxyXG4gICAgICBhbmQoXHJcbiAgICAgICAgZXEod2FsbGV0QWRkcmVzc2VzLnVzZXJXYWxsZXRJZCwgdXNlcldhbGxldElkKSxcclxuICAgICAgICBlcSh3YWxsZXRBZGRyZXNzZXMuYmxvY2tjaGFpbiwgXCJzb2xhbmFcIiksXHJcbiAgICAgICAgZXEod2FsbGV0QWRkcmVzc2VzLmlzUHJpbWFyeSwgdHJ1ZSksXHJcbiAgICAgICAgZXEod2FsbGV0QWRkcmVzc2VzLmlzVmVyaWZpZWQsIHRydWUpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgcmV0dXJuIHJlc3VsdFswXSB8fCAoYXdhaXQgZ2V0VXNlclNvbGFuYUFkZHJlc3ModXNlcldhbGxldElkKSk7XHJcbn1cclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byB1cGxvYWQgbWV0YWRhdGFcclxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkTWV0YWRhdGEoaW1hZ2VGaWxlLCBtZXRhZGF0YSkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBVcGxvYWQgaW1hZ2UgZmlyc3RcclxuICAgIGNvbnN0IGltYWdlQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGltYWdlRmlsZS5wYXRoKTtcclxuICAgIGNvbnN0IGdlbmVyaWNGaWxlID0ge1xyXG4gICAgICBidWZmZXI6IGltYWdlQnVmZmVyLFxyXG4gICAgICBmaWxlTmFtZTogaW1hZ2VGaWxlLm9yaWdpbmFsbmFtZSB8fCBpbWFnZUZpbGUuZmlsZW5hbWUgfHwgXCJpbWFnZVwiLFxyXG4gICAgICBkaXNwbGF5TmFtZTogaW1hZ2VGaWxlLm9yaWdpbmFsbmFtZSB8fCBpbWFnZUZpbGUuZmlsZW5hbWUgfHwgXCJpbWFnZVwiLFxyXG4gICAgICB1bmlxdWVOYW1lOlxyXG4gICAgICAgIERhdGUubm93KCkgK1xyXG4gICAgICAgIFwiLVwiICtcclxuICAgICAgICAoaW1hZ2VGaWxlLm9yaWdpbmFsbmFtZSB8fCBpbWFnZUZpbGUuZmlsZW5hbWUgfHwgXCJpbWFnZVwiKSxcclxuICAgICAgY29udGVudFR5cGU6IGltYWdlRmlsZS5taW1ldHlwZSB8fCBcImltYWdlL3BuZ1wiLFxyXG4gICAgICBleHRlbnNpb246XHJcbiAgICAgICAgKGltYWdlRmlsZS5vcmlnaW5hbG5hbWUgfHwgaW1hZ2VGaWxlLmZpbGVuYW1lIHx8IFwiaW1hZ2VcIilcclxuICAgICAgICAgIC5zcGxpdChcIi5cIilcclxuICAgICAgICAgIC5wb3AoKSB8fCBcInBuZ1wiLFxyXG4gICAgICB0YWdzOiBbXSxcclxuICAgIH07XHJcbiAgICBjb25zdCBbaW1hZ2VVcmldID0gYXdhaXQgdW1pLnVwbG9hZGVyLnVwbG9hZChbZ2VuZXJpY0ZpbGVdKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgbWV0YWRhdGEgSlNPTlxyXG4gICAgY29uc3QgbWV0YWRhdGFKc29uID0ge1xyXG4gICAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbjogbWV0YWRhdGEuZGVzY3JpcHRpb24sXHJcbiAgICAgIGltYWdlOiBpbWFnZVVyaSxcclxuICAgICAgYXR0cmlidXRlczogbWV0YWRhdGEuYXR0cmlidXRlcyB8fCBbXSxcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNhdGVnb3J5OiBcImltYWdlXCIsXHJcbiAgICAgICAgY3JlYXRvcnM6IG1ldGFkYXRhLmNyZWF0b3JzIHx8IFtdLFxyXG4gICAgICAgIC4uLm1ldGFkYXRhLnByb3BlcnRpZXMsXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIENvbWljLXNwZWNpZmljIG1ldGFkYXRhXHJcbiAgICAgIGNvbWljOiB7XHJcbiAgICAgICAgaXNzdWU6IG1ldGFkYXRhLmlzc3VlIHx8IDEsXHJcbiAgICAgICAgc2VyaWVzOiBtZXRhZGF0YS5zZXJpZXMgfHwgXCJcIixcclxuICAgICAgICBhdXRob3I6IG1ldGFkYXRhLmF1dGhvciB8fCBcIlwiLFxyXG4gICAgICAgIGdlbnJlOiBtZXRhZGF0YS5nZW5yZSB8fCBcIlwiLFxyXG4gICAgICAgIHB1Ymxpc2hEYXRlOiBtZXRhZGF0YS5wdWJsaXNoRGF0ZSB8fCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgcGFnZXM6IG1ldGFkYXRhLnBhZ2VzIHx8IDEsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFVwbG9hZCBtZXRhZGF0YSBKU09OXHJcbiAgICBjb25zdCBtZXRhZGF0YVVyaSA9IGF3YWl0IHVtaS51cGxvYWRlci51cGxvYWRKc29uKG1ldGFkYXRhSnNvbik7XHJcblxyXG4gICAgLy8gQ2xlYW4gdXAgdXBsb2FkZWQgZmlsZVxyXG4gICAgZnMudW5saW5rU3luYyhpbWFnZUZpbGUucGF0aCk7XHJcblxyXG4gICAgcmV0dXJuIG1ldGFkYXRhVXJpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyBDbGVhbiB1cCBmaWxlIG9uIGVycm9yXHJcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhpbWFnZUZpbGUucGF0aCkpIHtcclxuICAgICAgZnMudW5saW5rU3luYyhpbWFnZUZpbGUucGF0aCk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFQSSBSb3RlclxyXG5cclxuLy8gQ3JlYXRlIGEgbmV3IGNvbGxlY3Rpb25cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwaUNvbGxlY3Rpb24gPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiwgaW1hZ2UsIHVzZXJQcm9maWxlSWQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIGlmICghbmFtZSB8fCAhZGVzY3JpcHRpb24gfHwgIWltYWdlKSB7XHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDQwMClcclxuICAgICAgICAuanNvbih7IGVycm9yOiBcIk5hbWUsIGRlc2NyaXB0aW9uLCBhbmQgaW1hZ2UgVVJMIGFyZSByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ldGFkYXRhSnNvbiA9IHtcclxuICAgICAgbmFtZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGltYWdlLFxyXG4gICAgICBhdHRyaWJ1dGVzOiBbXSxcclxuICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNhdGVnb3J5OiBcImltYWdlXCIsXHJcbiAgICAgICAgY3JlYXRvcnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYWRkcmVzczogbWFzdGVyV2FsbGV0LnB1YmxpY0tleSxcclxuICAgICAgICAgICAgcGVyY2VudGFnZTogMTAwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICAgIHR5cGUgU29sQW1vdW50ID0ge1xyXG4gICAgICBiYXNpc1BvaW50czogYmlnaW50O1xyXG4gICAgICBpZGVudGlmaWVyOiBcIlNPTFwiO1xyXG4gICAgICBkZWNpbWFsczogOTtcclxuICAgIH07XHJcbiAgICBjb25zdCBhbW91bnQ6IFNvbEFtb3VudCA9IHtcclxuICAgICAgYmFzaXNQb2ludHM6IEJpZ0ludCg5KSxcclxuICAgICAgaWRlbnRpZmllcjogXCJTT0xcIixcclxuICAgICAgZGVjaW1hbHM6IDksXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coYXdhaXQgdW1pLnJwYy5haXJkcm9wKG1hc3RlcldhbGxldC5wdWJsaWNLZXksIGFtb3VudCkpO1xyXG5cclxuICAgIGNvbnN0IG1ldGFkYXRhVXJpID0gYXdhaXQgdW1pLnVwbG9hZGVyLnVwbG9hZEpzb24obWV0YWRhdGFKc29uKTtcclxuICAgIGNvbnNvbGUubG9nKG1ldGFkYXRhVXJpKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25TaWduZXIgPSBnZW5lcmF0ZVNpZ25lcih1bWkpO1xyXG5cclxuICAgIGF3YWl0IGNyZWF0ZUNvbGxlY3Rpb24odW1pLCB7XHJcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25TaWduZXIsXHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIHVyaTogbWV0YWRhdGFVcmksXHJcbiAgICB9KS5zZW5kQW5kQ29uZmlybSh1bWkpO1xyXG5cclxuICAgIC8vIGFkZCBjcmVhXHJcblxyXG4gICAgcmVzLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBjb2xsZWN0aW9uSWQ6IGNvbGxlY3Rpb25TaWduZXIucHVibGljS2V5LFxyXG4gICAgICBtZXNzYWdlOiBcIkNvbGxlY3Rpb24gY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiQ29sbGVjdGlvbiBjcmVhdGlvbiBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzXHJcbiAgICAgIC5zdGF0dXMoNTAwKVxyXG4gICAgICAuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBjcmVhdGUgY29sbGVjdGlvblwiLCBkZXRhaWxzOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmxldCBkZWZhdWx0Q29sbGVjdGlvbjtcclxuXHJcbmV4cG9ydCBjb25zdCBtaW50QXBpTkZUID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghcmVxLmZpbGUpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiSW1hZ2UgZmlsZSBpcyByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgdXNlclByb2ZpbGVJZCxcclxuICAgICAgbmFtZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGF1dGhvcixcclxuICAgICAgc2VyaWVzLFxyXG4gICAgICBpc3N1ZSxcclxuICAgICAgZ2VucmUsXHJcbiAgICAgIHBhZ2VzLFxyXG4gICAgICBwdWJsaXNoRGF0ZSxcclxuICAgICAgY29sbGVjdGlvbklkLFxyXG4gICAgICBhdHRyaWJ1dGVzLFxyXG4gICAgICB0cmFuc2ZlckltbWVkaWF0ZWx5ID0gdHJ1ZSxcclxuICAgIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcclxuICAgIGlmICghdXNlclByb2ZpbGVJZCB8fCAhbmFtZSB8fCAhZGVzY3JpcHRpb24pIHtcclxuICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoNDAwKVxyXG4gICAgICAgIC5qc29uKHsgZXJyb3I6IFwidXNlclByb2ZpbGVJZCwgbmFtZSwgYW5kIGRlc2NyaXB0aW9uIGFyZSByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB1c2VyJ3Mgd2FsbGV0IGZyb20gZGF0YWJhc2VcclxuICAgIGNvbnN0IHVzZXJXYWxsZXQgPSBcImF3YWl0IGdldFVzZXJXYWxsZXRCeVVzZXJJZCh1c2VyUHJvZmlsZUlkKTtcIjtcclxuICAgIGlmICghdXNlcldhbGxldCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogXCJVc2VyIHdhbGxldCBub3QgZm91bmRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgdXNlcidzIHByaW1hcnkgU29sYW5hIGFkZHJlc3NcclxuICAgIGNvbnN0IHVzZXJTb2xhbmFXYWxsZXQgPVxyXG4gICAgICBcImF3YWl0IGdldFVzZXJQcmltYXJ5U29sYW5hQWRkcmVzcyh1c2VyV2FsbGV0LmlkKTtcIjtcclxuICAgIGlmICghdXNlclNvbGFuYVdhbGxldCkge1xyXG4gICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgLnN0YXR1cyg0MDQpXHJcbiAgICAgICAgLmpzb24oeyBlcnJvcjogXCJVc2VyIGhhcyBubyB2ZXJpZmllZCBTb2xhbmEgd2FsbGV0IGFkZHJlc3NcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgTWludGluZyBORlQgZm9yIHVzZXIgJHt1c2VyUHJvZmlsZUlkfSB0byBhZGRyZXNzICR7dXNlclNvbGFuYVdhbGxldC5hZGRyZXNzfWApO1xyXG5cclxuICAgIC8vIFBhcnNlIGF0dHJpYnV0ZXMgaWYgcHJvdmlkZWRcclxuICAgIGxldCBwYXJzZWRBdHRyaWJ1dGVzID0gW107XHJcbiAgICBpZiAoYXR0cmlidXRlcykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHBhcnNlZEF0dHJpYnV0ZXMgPSBKU09OLnBhcnNlKGF0dHJpYnV0ZXMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIkludmFsaWQgYXR0cmlidXRlcyBmb3JtYXRcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBjb21pYy1zcGVjaWZpYyBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBjb21pY0F0dHJpYnV0ZXMgPSBbXHJcbiAgICAgIHsgdHJhaXRfdHlwZTogXCJBdXRob3JcIiwgdmFsdWU6IGF1dGhvciB8fCBcIlVua25vd25cIiB9LFxyXG4gICAgICB7IHRyYWl0X3R5cGU6IFwiU2VyaWVzXCIsIHZhbHVlOiBzZXJpZXMgfHwgXCJTdGFuZGFsb25lXCIgfSxcclxuICAgICAgeyB0cmFpdF90eXBlOiBcIklzc3VlXCIsIHZhbHVlOiBpc3N1ZSB8fCBcIjFcIiB9LFxyXG4gICAgICB7IHRyYWl0X3R5cGU6IFwiR2VucmVcIiwgdmFsdWU6IGdlbnJlIHx8IFwiQ29taWNcIiB9LFxyXG4gICAgICB7IHRyYWl0X3R5cGU6IFwiUGFnZXNcIiwgdmFsdWU6IHBhZ2VzIHx8IFwiMVwiIH0sXHJcbiAgICAgIHsgdHJhaXRfdHlwZTogXCJQbGF0Zm9ybVwiLCB2YWx1ZTogXCJZb3VyUGxhdGZvcm1OYW1lXCIgfSxcclxuICAgICAgeyB0cmFpdF90eXBlOiBcIk1pbnRlZCBCeVwiLCB2YWx1ZTogXCJQbGF0Zm9ybVwiIH0sXHJcbiAgICAgIC4uLnBhcnNlZEF0dHJpYnV0ZXMsXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIFByZXBhcmUgbWV0YWRhdGFcclxuICAgIGNvbnN0IG1ldGFkYXRhID0ge1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgYXV0aG9yLFxyXG4gICAgICBzZXJpZXMsXHJcbiAgICAgIGlzc3VlLFxyXG4gICAgICBnZW5yZSxcclxuICAgICAgcGFnZXMsXHJcbiAgICAgIHB1Ymxpc2hEYXRlLFxyXG4gICAgICBhdHRyaWJ1dGVzOiBjb21pY0F0dHJpYnV0ZXMsXHJcbiAgICAgIGNyZWF0b3JzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgYWRkcmVzczogbWFzdGVyV2FsbGV0LnB1YmxpY0tleSxcclxuICAgICAgICAgIHBlcmNlbnRhZ2U6IDEwMCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBVcGxvYWQgbWV0YWRhdGFcclxuICAgIGNvbnN0IG1ldGFkYXRhVXJpID0gYXdhaXQgdXBsb2FkTWV0YWRhdGEocmVxLmZpbGUsIG1ldGFkYXRhKTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBhc3NldCBzaWduZXJcclxuICAgIGNvbnN0IGFzc2V0U2lnbmVyID0gZ2VuZXJhdGVTaWduZXIodW1pKTtcclxuXHJcbiAgICAvLyBQcmVwYXJlIG1pbnQgcGFyYW1ldGVycyAoaW5pdGlhbGx5IG1pbnQgdG8gbWFzdGVyIHdhbGxldClcclxuICAgIGNvbnN0IG1pbnRQYXJhbXMgPSB7XHJcbiAgICAgIGFzc2V0OiBhc3NldFNpZ25lcixcclxuICAgICAgbmFtZSxcclxuICAgICAgdXJpOiBtZXRhZGF0YVVyaSxcclxuICAgICAgb3duZXI6IG1hc3RlcldhbGxldC5wdWJsaWNLZXksIC8vIE1pbnQgdG8gbWFzdGVyIHdhbGxldCBmaXJzdFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBBZGQgY29sbGVjdGlvbiBpZiBzcGVjaWZpZWRcclxuICAgIGlmIChjb2xsZWN0aW9uSWQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gYXdhaXQgZmV0Y2hDb2xsZWN0aW9uKHVtaSwgcHVibGljS2V5KGNvbGxlY3Rpb25JZCkpO1xyXG4gICAgICAgIG1pbnRQYXJhbXNbXCJjb2xsZWN0aW9uXCJdID0gY29sbGVjdGlvbjtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbGxlY3Rpb24gbm90IGZvdW5kLCBtaW50aW5nIHdpdGhvdXQgY29sbGVjdGlvblwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gY29uc3QgdXNlclB1YmxpY0tleSA9IHB1YmxpY0tleSh1c2VyU29sYW5hV2FsbGV0LmFkZHJlc3MpXHJcblxyXG4gICAgLy8gQWRkIHJveWFsdGllcyBwbHVnaW4gKHBsYXRmb3JtIGdldHMgcm95YWx0aWVzKVxyXG4gICAgbWludFBhcmFtc1tcInBsdWdpbnNcIl0gPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBcIlJveWFsdGllc1wiLFxyXG4gICAgICAgIGJhc2lzUG9pbnRzOiA1MDAsIC8vIDUlIHJveWFsdHkgdG8gcGxhdGZvcm1cclxuICAgICAgICBjcmVhdG9yczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBhZGRyZXNzOiBtYXN0ZXJXYWxsZXQucHVibGljS2V5LFxyXG4gICAgICAgICAgICBwZXJjZW50YWdlOiAxMDAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcnVsZVNldDogeyB0eXBlOiBcIk5vbmVcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBDcmVhdGUgdGhlIGFzc2V0XHJcbiAgICBjb25zb2xlLmxvZyhcIkNyZWF0aW5nIE5GVC4uLlwiKTtcclxuICAgIGNvbnN0IGNyZWF0ZVJlc3VsdCA9IGF3YWl0IGNyZWF0ZSh1bWksIG1pbnRQYXJhbXMpLnNlbmRBbmRDb25maXJtKHVtaSk7XHJcblxyXG4gICAgLy9zYXZlIG5mdCB0byBkYXRhYmFzZVxyXG4gICAgYXdhaXQgZGIuaW5zZXJ0KG5mdCkudmFsdWVzKHtcclxuICAgICAgb3duZXI6IHVzZXJXYWxsZXQsIC8vIFVVSUQgZnJvbSB0aGUgdXNlciB3YWxsZXRcclxuICAgICAgY29sZWN0aW9uOiBjb2xsZWN0aW9uSWQgPz8gXCJzdGFuZGFsb25lXCIsIC8vIG9wdGlvbmFsIG9yIGRlZmF1bHQgc3RyaW5nXHJcbiAgICAgIGlzTGltaXRlZEVkaXRpb246IGZhbHNlLCAvLyBvciB0cnVlIGlmIGl0J3MgYSBsaW1pdGVkIGVkaXRpb25cclxuICAgICAgYW1vdW50OiAxLCAvLyBhc3N1bWUgMSBORlQgbWludGVkXHJcbiAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBhdXRob3IsXHJcbiAgICAgICAgaW1hZ2U6IHJlcS5maWxlLnBhdGgsXHJcbiAgICAgICAgdXJpOiBtZXRhZGF0YVVyaSxcclxuICAgICAgICBhc3NldElkOiBhc3NldFNpZ25lci5wdWJsaWNLZXksXHJcbiAgICAgICAgYXR0cmlidXRlczogY29taWNBdHRyaWJ1dGVzLFxyXG4gICAgICAgIG1pbnRTaWduYXR1cmU6IGNyZWF0ZVJlc3VsdC5zaWduYXR1cmUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0YXR1czogXCJjb21wbGV0ZWRcIiwgLy8gb3IgJ3BlbmRpbmcnIGlmIHRoZXJlJ3MgbW9yZSBmbG93XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdHJhbnNmZXJSZXN1bHQgPSBudWxsO1xyXG5cclxuICAgIC8vIFRyYW5zZmVyIHRvIHVzZXIgaW1tZWRpYXRlbHkgaWYgcmVxdWVzdGVkXHJcbiAgICAvLyBpZiAodHJhbnNmZXJJbW1lZGlhdGVseSkge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZygnVHJhbnNmZXJyaW5nIE5GVCB0byB1c2VyLi4uJyk7XHJcbiAgICAvLyAgIHRyeSB7XHJcbiAgICAvLyAgICBpZiAoY29sbGVjdGlvbklkKXtcclxuICAgIC8vICAgICAgdHJhbnNmZXJSZXN1bHQgPSBhd2FpdCB0cmFuc2ZlclYxKHVtaSwge1xyXG4gICAgLy8gICAgICAgYXNzZXQ6IGFzc2V0U2lnbmVyLnB1YmxpY0tleSxcclxuICAgIC8vICAgICAgIG5ld093bmVyOiBwdWJsaWNLZXkodXNlclNvbGFuYVdhbGxldC5hZGRyZXNzKSxcclxuICAgIC8vICAgICB9KS5zZW5kQW5kQ29uZmlybSh1bWkpO1xyXG4gICAgLy8gICAgfWVsc2V7XHJcbiAgICAvLyAgICAgIHRyYW5zZmVyUmVzdWx0ID0gYXdhaXQgdHJhbnNmZXJWMSh1bWksIHtcclxuICAgIC8vICAgICAgIGFzc2V0OiBhc3NldFNpZ25lci5wdWJsaWNLZXksXHJcbiAgICAvLyAgICAgICBuZXdPd25lcjogcHVibGljS2V5KHVzZXJTb2xhbmFXYWxsZXQuYWRkcmVzcyksXHJcbiAgICAvLyAgICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uSWRcclxuICAgIC8vICAgICB9KS5zZW5kQW5kQ29uZmlybSh1bWkpO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICB9IGNhdGNoICh0cmFuc2ZlckVycm9yKSB7XHJcbiAgICAvLyAgICAgY29uc29sZS5lcnJvcignVHJhbnNmZXIgZmFpbGVkOicsIHRyYW5zZmVyRXJyb3IpO1xyXG4gICAgLy8gICAgIC8vIE5GVCB3YXMgbWludGVkIGJ1dCB0cmFuc2ZlciBmYWlsZWQgLSB5b3UgbWlnaHQgd2FudCB0byBoYW5kbGUgdGhpcyBkaWZmZXJlbnRseVxyXG4gICAgLy8gICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAvLyAgICAgICBlcnJvcjogJ05GVCBtaW50ZWQgYnV0IHRyYW5zZmVyIGZhaWxlZCcsXHJcbiAgICAvLyAgICAgICBkZXRhaWxzOiB0cmFuc2ZlckVycm9yLm1lc3NhZ2UsXHJcbiAgICAvLyAgICAgICBhc3NldElkOiBhc3NldFNpZ25lci5wdWJsaWNLZXksXHJcbiAgICAvLyAgICAgICBtaW50U2lnbmF0dXJlOiBjcmVhdGVSZXN1bHQuc2lnbmF0dXJlLFxyXG4gICAgLy8gICAgICAgbWV0YWRhdGFVcmlcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIExvZyB0aGUgdHJhbnNhY3Rpb24gZm9yIHlvdXIgcmVjb3Jkc1xyXG4gICAgY29uc29sZS5sb2coYE5GVCBtaW50ZWQgc3VjY2Vzc2Z1bGx5OlxyXG4gICAgICBBc3NldCBJRDogJHthc3NldFNpZ25lci5wdWJsaWNLZXl9XHJcbiAgICAgIFVzZXI6ICR7dXNlclByb2ZpbGVJZH1cclxuICAgICAgVXNlciBXYWxsZXQ6ICR7dXNlclNvbGFuYVdhbGxldH1cclxuICAgICAgTWludCBTaWduYXR1cmU6ICR7Y3JlYXRlUmVzdWx0LnNpZ25hdHVyZX1cclxuICAgICAgVHJhbnNmZXIgU2lnbmF0dXJlOiAke3RyYW5zZmVyUmVzdWx0Py5zaWduYXR1cmUgfHwgXCJOL0FcIn1cclxuICAgIGApO1xyXG5cclxuICAgIHJlcy5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgYXNzZXRJZDogYXNzZXRTaWduZXIucHVibGljS2V5LFxyXG4gICAgICBtaW50U2lnbmF0dXJlOiBjcmVhdGVSZXN1bHQuc2lnbmF0dXJlLFxyXG4gICAgICB0cmFuc2ZlclNpZ25hdHVyZTogdHJhbnNmZXJSZXN1bHQ/LnNpZ25hdHVyZSxcclxuICAgICAgbWV0YWRhdGFVcmksXHJcbiAgICAgIC8vIHVzZXJXYWxsZXRBZGRyZXNzOiB1c2VyU29sYW5hV2FsbGV0LmFkZHJlc3MsXHJcbiAgICAgIHRyYW5zZmVycmVkOiB0cmFuc2ZlckltbWVkaWF0ZWx5LFxyXG4gICAgICBtZXNzYWdlOiB0cmFuc2ZlckltbWVkaWF0ZWx5XHJcbiAgICAgICAgPyBcIkNvbWljIE5GVCBtaW50ZWQgYW5kIHRyYW5zZmVycmVkIHRvIHVzZXIgc3VjY2Vzc2Z1bGx5XCJcclxuICAgICAgICA6IFwiQ29taWMgTkZUIG1pbnRlZCBzdWNjZXNzZnVsbHkgKHRyYW5zZmVyIHBlbmRpbmcpXCIsXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIk1pbnRpbmcgZXJyb3I6XCIsIGVycm9yKTtcclxuXHJcbiAgICAvLyBDbGVhbiB1cCB1cGxvYWRlZCBmaWxlIG9uIGVycm9yXHJcbiAgICBpZiAocmVxLmZpbGUgJiYgZnMuZXhpc3RzU3luYyhyZXEuZmlsZS5wYXRoKSkge1xyXG4gICAgICBmcy51bmxpbmtTeW5jKHJlcS5maWxlLnBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcclxuICAgICAgZXJyb3I6IFwiRmFpbGVkIHRvIG1pbnQgTkZUXCIsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgTkZUIGRldGFpbHNcclxuZXhwb3J0IGNvbnN0IGdldEFzc2V0RGF0YSA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGFzc2V0SWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBmZXRjaEFzc2V0KHVtaSwgcHVibGljS2V5KGFzc2V0SWQpKTtcclxuXHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIGFzc2V0OiB7XHJcbiAgICAgICAgaWQ6IGFzc2V0LnB1YmxpY0tleSxcclxuICAgICAgICBuYW1lOiBhc3NldC5uYW1lLFxyXG4gICAgICAgIHVyaTogYXNzZXQudXJpLFxyXG4gICAgICAgIG93bmVyOiBhc3NldC5vd25lcixcclxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IGFzc2V0LnVwZGF0ZUF1dGhvcml0eSxcclxuICAgICAgICBwbHVnaW5zOiBhc3NldFtcInBsdWdpbnNcIl0gfHwgbnVsbCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRmV0Y2ggZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJlc1xyXG4gICAgICAuc3RhdHVzKDUwMClcclxuICAgICAgLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggTkZUXCIsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gR2V0IE5GVHMgYnkgb3duZXJcclxuZXhwb3J0IGNvbnN0IGdldEFzc2V0QnlPd25lciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHVzZXJQcm9maWxlSWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgLy8gR2V0IHVzZXIncyB3YWxsZXQgZnJvbSBkYXRhYmFzZVxyXG4gICAgY29uc3QgdXNlcldhbGxldCA9IGF3YWl0IGdldFVzZXJXYWxsZXRCeVVzZXJJZCh1c2VyUHJvZmlsZUlkKTtcclxuICAgIGlmICghdXNlcldhbGxldCkge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogXCJVc2VyIHdhbGxldCBub3QgZm91bmRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgYWxsIHVzZXIncyBTb2xhbmEgYWRkcmVzc2VzXHJcbiAgICBjb25zdCB1c2VyQWRkcmVzc2VzID0gYXdhaXQgZGJcclxuICAgICAgLnNlbGVjdCgpXHJcbiAgICAgIC5mcm9tKHdhbGxldEFkZHJlc3NlcylcclxuICAgICAgLndoZXJlKFxyXG4gICAgICAgIGFuZChcclxuICAgICAgICAgIGVxKHdhbGxldEFkZHJlc3Nlcy51c2VyV2FsbGV0SWQsIHVzZXJXYWxsZXQuaWQpLFxyXG4gICAgICAgICAgZXEod2FsbGV0QWRkcmVzc2VzLmJsb2NrY2hhaW4sIFwic29sYW5hXCIpLFxyXG4gICAgICAgICAgZXEod2FsbGV0QWRkcmVzc2VzLmlzVmVyaWZpZWQsIHRydWUpXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG5cclxuICAgIGlmICh1c2VyQWRkcmVzc2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gcmVzLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBhc3NldHM6IFtdIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZldGNoIE5GVHMgZm9yIGFsbCB1c2VyIGFkZHJlc3Nlc1xyXG4gICAgY29uc3QgYWxsQXNzZXRzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGFkZHJlc3Mgb2YgdXNlckFkZHJlc3Nlcykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHsgZmV0Y2hBc3NldHNCeU93bmVyIH0gPSByZXF1aXJlKFwiQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLWNvcmVcIik7XHJcbiAgICAgICAgY29uc3QgYXNzZXRzID0gYXdhaXQgZmV0Y2hBc3NldHNCeU93bmVyKFxyXG4gICAgICAgICAgdW1pLFxyXG4gICAgICAgICAgcHVibGljS2V5KGFkZHJlc3MuYWRkcmVzcylcclxuICAgICAgICApO1xyXG4gICAgICAgIGFsbEFzc2V0cy5wdXNoKC4uLmFzc2V0cyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIGBGYWlsZWQgdG8gZmV0Y2ggYXNzZXRzIGZvciBhZGRyZXNzICR7YWRkcmVzcy5hZGRyZXNzfTpgLFxyXG4gICAgICAgICAgZXJyb3JcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBhc3NldHM6IGFsbEFzc2V0cy5tYXAoKGFzc2V0KSA9PiAoe1xyXG4gICAgICAgIGlkOiBhc3NldC5wdWJsaWNLZXksXHJcbiAgICAgICAgbmFtZTogYXNzZXQubmFtZSxcclxuICAgICAgICB1cmk6IGFzc2V0LnVyaSxcclxuICAgICAgICBvd25lcjogYXNzZXQub3duZXIsXHJcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBhc3NldC51cGRhdGVBdXRob3JpdHksXHJcbiAgICAgIH0pKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRmV0Y2ggdXNlciBORlRzIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCB1c2VyIE5GVHNcIixcclxuICAgICAgZGV0YWlsczogZXJyb3IubWVzc2FnZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0cmFuc2Zlck5mdCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGFzc2V0SWQsIHVzZXJQcm9maWxlSWQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIGlmICghYXNzZXRJZCB8fCAhdXNlclByb2ZpbGVJZCkge1xyXG4gICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgLnN0YXR1cyg0MDApXHJcbiAgICAgICAgLmpzb24oeyBlcnJvcjogXCJhc3NldElkIGFuZCB1c2VyUHJvZmlsZUlkIGFyZSByZXF1aXJlZFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB1c2VyJ3Mgd2FsbGV0IGZyb20gZGF0YWJhc2VcclxuICAgIGNvbnN0IHVzZXJXYWxsZXQgPSBhd2FpdCBnZXRVc2VyV2FsbGV0QnlVc2VySWQodXNlclByb2ZpbGVJZCk7XHJcbiAgICBpZiAoIXVzZXJXYWxsZXQpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgZXJyb3I6IFwiVXNlciB3YWxsZXQgbm90IGZvdW5kXCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHVzZXIncyBwcmltYXJ5IFNvbGFuYSBhZGRyZXNzXHJcbiAgICBjb25zdCB1c2VyU29sYW5hV2FsbGV0ID0gYXdhaXQgZ2V0VXNlclByaW1hcnlTb2xhbmFBZGRyZXNzKHVzZXJXYWxsZXQuaWQpO1xyXG4gICAgaWYgKCF1c2VyU29sYW5hV2FsbGV0KSB7XHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDQwNClcclxuICAgICAgICAuanNvbih7IGVycm9yOiBcIlVzZXIgaGFzIG5vIHZlcmlmaWVkIFNvbGFuYSB3YWxsZXQgYWRkcmVzc1wiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZlcmlmeSB0aGUgYXNzZXQgZXhpc3RzIGFuZCBpcyBvd25lZCBieSBtYXN0ZXIgd2FsbGV0XHJcbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IGZldGNoQXNzZXQodW1pLCBwdWJsaWNLZXkoYXNzZXRJZCkpO1xyXG4gICAgaWYgKGFzc2V0Lm93bmVyICE9PSBtYXN0ZXJXYWxsZXQucHVibGljS2V5KSB7XHJcbiAgICAgIHJldHVybiByZXNcclxuICAgICAgICAuc3RhdHVzKDQwMClcclxuICAgICAgICAuanNvbih7IGVycm9yOiBcIkFzc2V0IGlzIG5vdCBvd25lZCBieSBwbGF0Zm9ybSB3YWxsZXRcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcmFuc2ZlciB0aGUgYXNzZXRcclxuICAgIGNvbnN0IHRyYW5zZmVyUmVzdWx0ID0gYXdhaXQgdHJhbnNmZXIodW1pLCB7XHJcbiAgICAgIGFzc2V0OiBwdWJsaWNLZXkoYXNzZXRJZCksXHJcbiAgICAgIG5ld093bmVyOiBwdWJsaWNLZXkodXNlclNvbGFuYVdhbGxldC5hZGRyZXNzKSxcclxuICAgIH0pLnNlbmRBbmRDb25maXJtKHVtaSk7XHJcblxyXG4gICAgcmVzLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBhc3NldElkLFxyXG4gICAgICB0cmFuc2ZlclNpZ25hdHVyZTogdHJhbnNmZXJSZXN1bHQuc2lnbmF0dXJlLFxyXG4gICAgICB1c2VyV2FsbGV0QWRkcmVzczogdXNlclNvbGFuYVdhbGxldC5hZGRyZXNzLFxyXG4gICAgICBtZXNzYWdlOiBcIk5GVCB0cmFuc2ZlcnJlZCB0byB1c2VyIHN1Y2Nlc3NmdWxseVwiLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJUcmFuc2ZlciBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xyXG4gICAgICBlcnJvcjogXCJGYWlsZWQgdG8gdHJhbnNmZXIgTkZUXCIsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UGxhdGZvcm1ORlRzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgZmV0Y2hBc3NldHNCeU93bmVyIH0gPSByZXF1aXJlKFwiQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLWNvcmVcIik7XHJcbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBmZXRjaEFzc2V0c0J5T3duZXIodW1pLCBtYXN0ZXJXYWxsZXQucHVibGljS2V5KTtcclxuXHJcbiAgICByZXMuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIGFzc2V0czogYXNzZXRzLm1hcCgoYXNzZXQpID0+ICh7XHJcbiAgICAgICAgaWQ6IGFzc2V0LnB1YmxpY0tleSxcclxuICAgICAgICBuYW1lOiBhc3NldC5uYW1lLFxyXG4gICAgICAgIHVyaTogYXNzZXQudXJpLFxyXG4gICAgICAgIG93bmVyOiBhc3NldC5vd25lcixcclxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IGFzc2V0LnVwZGF0ZUF1dGhvcml0eSxcclxuICAgICAgfSkpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJGZXRjaCBwbGF0Zm9ybSBORlRzIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7XHJcbiAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBmZXRjaCBwbGF0Zm9ybSBORlRzXCIsXHJcbiAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiJdfQ==