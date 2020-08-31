import {MapLayer} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import {withLeaflet} from "react-leaflet";

class Cercle extends MapLayer {
    createLeafletElement() {
        const {map, color, fillColor, pos, fillOpacity, radius} = this.props;
        let leafletElement = L.circle(pos, {
            color: color,
            fillColor: fillColor,
            fillOpacity: fillOpacity,
            radius: radius
        }).addTo(map.leafletElement);
        return leafletElement;
    }

}

export default withLeaflet(Cercle);

