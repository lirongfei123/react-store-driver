declare module 'react-store-driver' {
  import { ComponentType } from 'react'
  function createGlobalConnect(obj?: Object): any
  function createLocalConnect(name: string, comp: any): any
}
