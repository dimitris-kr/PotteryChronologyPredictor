export class MenuItem {
    label: string;
    icon: string;
    route: string;

    constructor(label: string, icon: string, route: string) {
        this.label = label;
        this.icon = icon;
        this.route = route;
    }
}
