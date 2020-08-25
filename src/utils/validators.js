export function required() {
    return { type: "required" };
}
export function length(options) {
    return { type: "length", options };
}
export function validate(value, validators) {
    for (let validator of validators) {
        if (validator.type === "required" && (!value || !value.length)) {
            return {
                valid: false,
                message: "改表单的内容必须填项"
            };
        }
        if (validator.type === "length" && (value.length < validator.options.min || value.length > validator.options.max)) {
            return {
                valid: false,
                message: `字段长度不能小于${validator.options.min},并且不能大于${validator.options.max}`
            };
        }
    }
    return { valid: true };
}
//# sourceMappingURL=validators.js.map