# AWS S3 File Service Setup

This guide explains how to set up the AWS S3 file service for comic uploads in the NerdWork Plus backend.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=nerdwork-comics
```

## AWS Setup Steps

### 1. Create an AWS Account
- Go to [AWS Console](https://aws.amazon.com/console/)
- Create an account or sign in to existing account

### 2. Create an S3 Bucket
1. Navigate to S3 service in AWS Console
2. Click "Create bucket"
3. Enter bucket name (e.g., `nerdwork-comics-prod`)
4. Select your preferred region
5. Configure bucket settings:
   - **Block Public Access**: Keep enabled for security
   - **Versioning**: Enable if you want file versioning
   - **Encryption**: Enable server-side encryption
6. Click "Create bucket"

### 3. Create IAM User for API Access
1. Navigate to IAM service in AWS Console
2. Click "Users" → "Add user"
3. Enter username (e.g., `nerdwork-s3-user`)
4. Select "Programmatic access" for access type
5. Click "Next: Permissions"

### 4. Set IAM Permissions
1. Click "Attach existing policies directly"
2. Create a custom policy with minimal required permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

3. Replace `your-bucket-name` with your actual bucket name
4. Attach this policy to the user

### 5. Get Access Keys
1. After creating the user, download the CSV file containing:
   - Access Key ID
   - Secret Access Key
2. Add these to your `.env.local` file
3. **Important**: Never commit these keys to version control

## File Service Features

### Upload Single File
```bash
POST /api/files/upload
Content-Type: multipart/form-data

# Form fields:
# - file: Comic file (image, PDF, or ZIP)
# - userId: User ID (required)
# - title: Comic title (optional)
# - description: Description (optional)
# - genre: Genre (optional)
# - author: Author name (optional)
```

### Upload Multiple Files
```bash
POST /api/files/upload-multiple
Content-Type: multipart/form-data

# Form fields:
# - files[]: Multiple comic files
# - userId: User ID (required)
# - title: Series title (optional)
# - description: Series description (optional)
# - genre: Genre (optional)
# - author: Author name (optional)
```

### Get File (Signed URL)
```bash
GET /api/files/{s3Key}?expiresIn=3600
```

### Update File
```bash
PUT /api/files/{s3Key}
Content-Type: multipart/form-data

# Form fields:
# - file: New comic file (required)
# - title: Updated title (optional)
# - description: Updated description (optional)
# - genre: Updated genre (optional)
# - author: Updated author (optional)
```

### Delete File
```bash
DELETE /api/files/{s3Key}
```

### List User Files
```bash
GET /api/files/user/{userId}
```

## Supported File Types

- **Images**: JPEG, PNG, GIF, WebP
- **Documents**: PDF (for comic books)
- **Archives**: ZIP (for comic archives)

## File Organization

Files are stored in S3 with the following structure:
```
comics/
├── {userId}/
│   ├── {uniqueId}.jpg
│   ├── {uniqueId}.pdf
│   └── {uniqueId}.zip
```

## Security Features

1. **Signed URLs**: All file access uses temporary signed URLs
2. **File Type Validation**: Only allowed file types can be uploaded
3. **Size Limits**: 50MB maximum file size
4. **User Isolation**: Files are organized by user ID
5. **Metadata Storage**: File metadata is stored with each upload

## Error Handling

The service includes comprehensive error handling for:
- Invalid file types
- File size limits
- Missing required parameters
- AWS service errors
- Network issues

## Monitoring and Logging

- All operations are logged to console
- AWS CloudWatch integration available
- Error details are returned in API responses
- File upload progress can be tracked

## Cost Optimization

- Uses S3 Standard storage class by default
- Consider using S3 Intelligent Tiering for cost optimization
- Implement lifecycle policies for old files
- Monitor data transfer costs

## Testing

Use the health check endpoint to verify the service:
```bash
GET /api/files/health
```

This will return service status and configuration details.