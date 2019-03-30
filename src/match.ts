type Condition<TValue> = (value: TValue) => boolean;

type Execution<TValue, TResult> = (value: TValue) => TResult;

type Pattern<TValue, TResult> = {
  condition: Condition<TValue>;
  execution: Execution<TValue, TResult>;
};

const when = <TValue>(condition: Condition<TValue>) => {
  return <TResult>(
    execution: Execution<TValue, TResult>
  ): Pattern<TValue, TResult> => {
    return {
      condition,
      execution
    };
  };
};

const match = <TValue>(value: TValue) => <TResult>(
  ...patterns: Array<Pattern<TValue, TResult>>
) => (defaultExecute?: Execution<TValue, TResult>): TResult => {
  const filteredPatterns = patterns.filter(
    (pattern: Pattern<TValue, TResult>) => pattern.condition(value)
  );

  return filteredPatterns.length >= 1
    ? filteredPatterns[0].execution(value)
    : !!defaultExecute
    ? defaultExecute(value)
    : throwError();
};

const throwError = <TResult>(): TResult => {
  throw new Error("Error: No pattern matched. Please use a wildcard pattern.");
};

export { Condition, Execution, Pattern, when, match };
