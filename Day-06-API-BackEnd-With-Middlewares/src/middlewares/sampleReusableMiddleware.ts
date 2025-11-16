//sample middleware function

import express, { NextFunction, Request, Response } from "express";

//can be used in multiple endpoints
export const sampleReusableMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    //logic of middleware
    
    res.send("")  // request eka issarahata geniyanne nethuwa, haraval ywanna oninam (request ekata geniyanne nethuwa) use return keyword

    // return next() // 

    if(req.headers.authorization == null) {
        // we have to use the return keyword here to stop the execution of the function
        return res.send("")  // request eka issarahata geniyanne nethuwa, haraval ywanna oninam (request ekata geniyanne nethuwa)
        // last code line eka 'next()' nam, anivaryen response ekata return keyword eka use krnna one. then, methanin exit wela herila yanne. nettam, callbacks tika (next()) ekath run venawa 
    }

    next()  // to go forward to the request (to pass the control to next middleware or endpoint)
}