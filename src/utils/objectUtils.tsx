export const isObj = (val: any) => {

    if (!Array.isArray(val) && val && typeof val === "object") {

        return true;

    }

    return false;

}
