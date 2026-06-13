export interface UploadMediaOptions {
    runId: string;
    filename: string;
    data: Buffer;
    contentType: string;
    apiBase: string;
    apiKey: string;
}
/**
 * Two-step upload to S3 via a presigned PUT URL.
 *
 *   1. POST { pathname, contentType, apiKey, runId } to /api/v1/media/presign.
 *      Server auths, generates a presigned URL with a 5-minute TTL, and
 *      returns it along with the final public URL.
 *   2. PUT the bytes directly to the presigned URL. No round-trip
 *      through our function — videos > 4.5MB would otherwise hit
 *      Vercel's function payload cap.
 *
 * Replaces the prior @vercel/blob/client upload flow. Cutover trigger:
 * the Hobby Blob plan's 1GB cap was silently dropping evidence uploads,
 * making PR comments render without Demo sections or per-step
 * screenshots. S3 is ~10x cheaper and has no surprise cap.
 */
export declare function uploadMedia(opts: UploadMediaOptions): Promise<string>;
