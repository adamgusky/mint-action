export interface UploadMediaOptions {
    runId: string;
    filename: string;
    data: Buffer;
    contentType: string;
    apiBase: string;
    apiKey: string;
}
/** Client-side upload: streams directly to Vercel Blob via presign endpoint. */
export declare function uploadMedia(opts: UploadMediaOptions): Promise<string>;
