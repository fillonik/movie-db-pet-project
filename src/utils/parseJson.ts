export function parseJson(raw: string) {
    try {
        const parsed = JSON.parse(raw);

        return parsed;
    } catch (error) {

        return null;
    }
}
