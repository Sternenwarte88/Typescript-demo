import fs from 'fs';
import { UserFile } from '../models/userFile.model.js';

class FileProcessor {
    public async writeFile(
        data: UserFile | string,
        path: string,
    ): Promise<void> {
        try {
            let raw: string;

            if (typeof data !== 'string') {
                raw = JSON.stringify(data, null, 2);
            } else {
                raw = data;
            }

            await fs.promises.writeFile(path, raw, 'utf8');
        } catch (error) {
            if (error instanceof Error) {
                throw Error('Error at writing data');
            }
        }
    }

    public async getCompleteData<T>(path: string): Promise<T> {
        let raw: string | undefined;
        try {
            raw = await fs.promises.readFile(path, 'utf8');
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error reading file: ${error.message}`);
            }
        }

        if (typeof raw !== 'string') {
            throw new Error('File content is not a string');
        }

        const parsedData: T = JSON.parse(raw) as T;

        return parsedData;
    }
}

export default new FileProcessor();
