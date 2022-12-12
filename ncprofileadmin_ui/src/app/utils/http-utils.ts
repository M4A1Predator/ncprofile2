import { HttpHeaders } from "@angular/common/http";
import { TOKEN_KEY } from "../constants/auth-constants"

export const getHttpAuthOption = (token = undefined): Object => {
  const hToken = token || localStorage.getItem(TOKEN_KEY)
  return {
    headers: {
      'Authorization': `Bearer ${hToken}`
    }
  }
}
