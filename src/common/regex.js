export const validNameInput = /^[ก-ูเ-์a-zA-Z- ]+$/
export const validNomalInput = /^[ก-ูเ-์a-zA-Z0-9-_\s:|]+$/ /// ^[ก-๙\w\s.-_\s:|]+$/
export const validNomalEngInput = /^[a-zA-Z0-9-_\s:|&]+$/
export const validNomalEngOnly = /^[a-zA-Z]+$/
export const validNomalEngSpacebar = /^[a-zA-Z\s]+$/
export const validNomalEngInputNotSpecial = /^[a-zA-Z0-9]+$/
export const validPhoneNumber = /^[0-9]+$/
export const validEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
export const validNumber = /^[0-9]*$/
export const validDecimal = /^(\d)*(\.)?([0-9]{0,2})?$/
export const validURL = /^(http(s)?:\/\/.)?(www\.)?[ก-ูเ-์a-zA-Z0-9-@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([ก-ูเ-์a-zA-Z0-9-@:%_\\+.~#?&/=]*)+(?<!\.exe)$/
export const validFormatDate = /^\d{1,2}\/\d{1,2}\/\d{4}$/
export const validEmailArise = /^[\w\-\\.]+@arise.tech$/
export const validCSVInjection = /^=/
