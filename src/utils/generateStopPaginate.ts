export function generateStopPaginate(total_count: number, size: number): number {
    const data = (total_count / size) - 1;
    return Math.ceil(data);
}