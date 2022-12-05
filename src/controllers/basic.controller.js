export const dashboard = (req, res) => {
    res.json({
        message: "Dashboard"
    });
}

export const notFound = (req, res) => {
    res.status(404).json({
        code: 404,
        message: "Not Found"
    });
}