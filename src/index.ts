type ArgObjType = Record<string, any>;
type ArgType = string | ArgObjType;
type ArgsType = ArgType | ArgType[];

const getClassListFromObj = (obj: ArgObjType): string[] => {
  return Object.entries(obj).reduce((acc: string[], [key, value]): string[] => {
    if (!!value) {
      acc.push(key);
    }

    return acc;
  }, []);
};

const getClassList = (...args: ArgsType[]): string[] => {
  return args.reduce((acc: string[], curr: ArgsType): string[] => {
    if (typeof curr === "string") {
      acc.push(curr);
    }

    if (Array.isArray(curr)) {
      const currentClasses = getClassList(...curr);

      acc = [...acc, ...currentClasses];
    } else if (typeof curr === "object") {
      acc = [...acc, ...getClassListFromObj(curr as ArgObjType)];
    }

    return acc;
  }, []);
};

const cxsl = (...args: ArgsType[]): string => {
  return getClassList(args).join(" ");
};
