export interface UploadMediaOptions {
    runId: string;
    filename: string;
    data: Blob | Buffer;
    contentType: string;
    apiBase: string;
    apiKey: string;
}
/**
 * Uploads media (screenshots, videos) to Vercel Blob via presigned URLs.
 * The API endpoint at /api/v1/media/presign handles signing and authorization.
 */
export declare function uploadMedia(opts: UploadMediaOptions): Promise<string>;
