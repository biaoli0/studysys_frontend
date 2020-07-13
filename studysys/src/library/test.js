function toJSON(params) {
  let json = {};
  if (params)
    Object.keys(params).map((i) => {
      json[i] = params[i];
    });
  return json;
}

const params = { name: "glry", menu: ["yes", "no"] };
console.log(toJSON(params));
