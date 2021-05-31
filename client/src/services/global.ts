import * as H from 'history';

export function getUrlParams(
  location: H.Location
){
  return location
    .search
    .replace('?', '')
    .split('$')
    .reduce((p:{[prop: string]: string}, e)=>{
      const a = e.split('=');
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    }, {});
}