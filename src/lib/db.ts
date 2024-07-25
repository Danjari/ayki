// Import the PrismaClient class from the '@prisma/client' package
import { PrismaClient } from '@prisma/client';

// Declare a global variable `prisma` of type PrismaClient or undefined
// This helps TypeScript recognize `prisma` as a global variable
declare global {
    var prisma: PrismaClient | undefined;
}

// Create a constant `db` and assign it the existing global `prisma` instance if it exists,
// otherwise create a new instance of PrismaClient
const db = globalThis.prisma || new PrismaClient();

// If the application is not running in production environment,
// assign the `db` instance to the global `prisma` variable
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

// Export the `db` instance for use in other parts of the application
export default db;
