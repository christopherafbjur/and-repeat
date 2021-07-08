import express, {ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
};

export default errorHandler;