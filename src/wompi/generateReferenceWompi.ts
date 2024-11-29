import { v4 as uuidv4 } from 'uuid';

export function generateReferenceWompi() {
    const uid = uuidv4();
    return uid.replace(/[-_]/g, '');
}