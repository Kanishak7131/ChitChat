import { Client, Databases, ID, Account, Query, Permission, Role } from 'appwrite';

export const client = new Client();
const account = new Account(client);

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export const fetchAllDocuments = async () => {
    try {
        const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_MEESAGE_COLLECTION_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]

        );
        return response.documents;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};

export const addMessage = async (body) => {
    try {
        const permissions = [
            Permission.write(Role.user(body.user_id)),
        ]
        const response = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_MEESAGE_COLLECTION_ID,
            ID.unique(),
            body,
            permissions
        );
        return response;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};

export const deleteMessage = async (id) => {
    try {
        const response = await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_MEESAGE_COLLECTION_ID,
            id
        );
        return response;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};
export const loginUser = async (email, password) => {
    try {
        let response = await account.createEmailPasswordSession(
            email,
            password
        );
        if (!response) {
            throw new Error("Error while logging in.....!")
        }
        let accountDetails = await account.get();
        return accountDetails;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};

export const getUser = async () => {
    try {
        let accountDetails = await account.get();
        return accountDetails;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};

export const logOut = async () => {
    try {
        let res = await account.deleteSession('current');
        return res;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};

export const registerNewUser = async (credentials) => {
    try {
        let response = await account.create(
            ID.unique(),
            credentials.email,
            credentials.password1,
            credentials.name
        );
        await account.createEmailPasswordSession(
            credentials.email,
            credentials.password1
        );
        let accountDetails = await account.get();
        return accountDetails;
    } catch (error) {
        console.log(`Appwrite listDocuments error: ${error}`);
        return null;
    }
};