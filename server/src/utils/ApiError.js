
class ApiError extends Error {
    constructor(
        statusCode,
        message = "SOMETHING WENT WRONG",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors


        // Remove the stack trace code while pushing to production.

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}

export { ApiError }