import fs from 'fs';
import { CourseFile } from '../models/courseFile.model.js';
import { UserFile } from '../models/userFile.model.js';

export class FileProcessor {
    /**
     * This method writes data to a File
     * @param data the data which should be written
     * @param path the path where the data should be written
     */
    public writeFile(data: UserFile | CourseFile | string, path: string): void {
        try {
            let raw: string;

            if (typeof data !== 'string') {
                raw = JSON.stringify(data, null, 2);
            } else {
                raw = data;
            }

            fs.writeFileSync(path, raw, 'utf8');
        } catch (error) {
            if (error instanceof Error) {
                throw Error('Error at writing data');
            }
        }
    }

    /**
     * This method tries to read data from a file
     * @param path The path where the data should be read from
     * @returns The data which should be fetched
     * @throws Throws an Error if the File couldn´t be read or filecontent ist not a string
     */
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
