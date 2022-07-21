/* Foot.ts

	Purpose:

	Description:

	History:
		Fri Jan 23 12:26:51     2009, Created by jumperchen

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
/**
 * Defines a set of footers ({@link Footer}) for a grid ({@link Grid}).
 * <p>Default {@link #getZclass}: z-foot.
 */
@zk.WrapClass('zul.grid.Foot')
export class Foot extends zul.Widget {
	override parent!: zul.grid.Grid | null;
	/** Returns the grid that contains this column.
	 * @return zul.grid.Grid
	 */
	getGrid(): zul.grid.Grid | null {
		return this.parent;
	}

	//bug #3014664
	override setVflex(v: boolean | string | null | undefined): this { //vflex ignored for grid Foot
		v = false;
		return super.setVflex(v);
	}

	//bug #3014664
	override setHflex(v: boolean | string | null | undefined): this { //hflex ignored for grid Foot
		v = false;
		return super.setHflex(v);
	}

	override deferRedrawHTML_(out: string[]): void {
		out.push('<tr', this.domAttrs_({domClass: true}), ' class="z-renderdefer"></tr>');
	}
	beforeChildAdded_: function (child, insertBefore) {
		if (!child.$instanceof(zul.grid.Footer)) {
			zk.error('Unsupported child for foot: ' + child.className);
			return false;
		}
		return true;
}