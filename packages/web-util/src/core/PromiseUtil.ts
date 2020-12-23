const raceSuccess = <T>(promises: Array<PromiseLike<T>>): PromiseLike<T> => {
  const reversedPromises = promises.map((_) =>
    _.then(
      (val) => Promise.reject(val),
      (err) => Promise.resolve(err)
    )
  );
  return Promise.all(reversedPromises).then(
    (errors) => Promise.reject(errors),
    (val) => Promise.resolve(val)
  );
};

export const PromiseUtil = Object.freeze({
  raceSuccess,
});
