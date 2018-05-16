import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nodeIcon' })
export class NodeIconPipe implements PipeTransform {

  transform(node: any, args?: any): any {
    node = node || {};
    let classes = 'fas ';
    switch (node.type) {

      case 0:
        classes += 'fa-folder';
        break;

      case 1:
        classes += 'fa-link';
        break;

      case 131:
        classes += 'fa-list';
        break;

      case 128:
        classes += 'fa-map';
        break;

      case 141:
        classes += 'fa-boxes';
        break;

      case 144:
        classes += 'fa-file-alt';
        break;

      case 153:
        classes += 'fa-clipboard-check';
        break;

      case 202:
        classes += 'fa-box';
        break;

      case 299:
        classes += 'fa-file';
        break;

      case 848:
        classes += 'fa-archive';
        break;

      case 30303:
        classes += 'fa-file';
        break;

      default:
        classes += 'fa-question';
        console.log(`unknown type: ${node.type}, ${node.type_name}`);
    }
    return classes;
  }

}
