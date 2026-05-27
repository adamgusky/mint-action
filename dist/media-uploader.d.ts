export interface UploadMediaOptions {
    runId: string;
    filename: string;
    data: Buffer;
    contentType: string;
    apiBase: string;
    apiKey: string;
}
/** Server-side upload: POSTs raw bytes to /api/v1/media/upload with Bearer auth. */
export declare function uploadMedia(opts: UploadMediaOptions): Promise<string>;
