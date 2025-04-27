// services/localStorageService.ts
const localStorageService = {
    getItem(key: string) {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },
    setItem(key: string, value: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, value);
        }
    }
};

export default localStorageService;
