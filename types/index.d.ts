
declare module 'react-store-driver' {
  type ConnectFunc<T> = {
    (mapStateToProps: (models: T) => any): any
  }
  interface LocalReturn<T> {
    (mapStateToProps: (models: T) => any): any
    withModel: ConnectFunc<T>
  }
  function createGlobalConnect<T>(obj?: Object): ConnectFunc<T>
  function createLocalConnect<T>(name: string, comp: any): LocalReturn<T>
}
