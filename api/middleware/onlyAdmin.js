import jwt from "jsonwebtoken"

export const onlyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
console.log("TOKEN FROM COOKIE:", token);
        if (!token) {
            const error = new Error("Unauthorized");
            error.statusCode = 403;
            return next(error);   // IMPORTANT: return stop execution
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decode"+decodeToken.role)

        if (decodeToken.role !== "admin") {
            const error = new Error("Only admin can access this route");
            error.statusCode = 403;
            return next(error);
        }

        req.user = decodeToken;
        next();
    } catch (err) {
        err.statusCode = 500; // Ensure status code exists
        next(err);
    }
};
