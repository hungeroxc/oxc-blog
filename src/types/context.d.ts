declare interface Context<T, P> {
    state: T
    dispatch: P
}