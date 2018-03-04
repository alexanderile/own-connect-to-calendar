/**
 *
 */

const emptyFunction = () => {
    return {};
};

export function ConnectImplementation(mapStateToProps = emptyFunction, mapDispatchToProps = emptyFunction) {
    return function (Component) {
        const appliedContext = {
            ...mapStateToProps(),
            ...mapDispatchToProps()
        };

        return function (props) {
            // return Component(Object.assign(appliedContext, props));
            return new Component(Object.assign(appliedContext, props));
        };
    }
}
