import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nodeIcon' })
export class NodeIconPipe implements PipeTransform {

  transform(node: any, args?: any): any {
    let classes = 'fas ';
    switch (node.type) {

      case 0:
        classes += 'fa-folder';
        break;

      case 1:
        classes += 'fa-link';
        break;

      case 144:
        classes += 'fa-file-alt';
        break;

      default:
        classes += 'fa-question';
        console.log('unknown type: ' + node.type);
    }
    return classes;
  }

}
