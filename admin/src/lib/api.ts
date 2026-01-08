export { default as api} from "./config";


// কনফিগ ফাইল থেকে সবগুলোকে এপিআই এর সাথে কানেক্ট করা হলো
export {getAdminApiConfig, adminApi, ADMIN_API_ENDPOINTS, buildAdminQueryParams} from "./config"

// Export default for backward compatibility
export {default} from "./config"
