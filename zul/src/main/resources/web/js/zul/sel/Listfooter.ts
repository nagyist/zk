/* Listfooter.ts

	Purpose:

	Description:

	History:
		Tue Jun  9 18:03:07     2009, Created by jumperchen

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
/**
 * A column of the footer of a list box ({@link Listbox}).
 * Its parent must be {@link Listfoot}.
 *
 * <p>Unlike {@link Listheader}, you could place any child in a list footer.
 * <p>Note: {@link Listcell} also accepts children.
 * <p>Default {@link #getZclass}: z-listfooter.
 */
@zk.WrapClass('zul.sel.Listfooter')
export class Listfooter extends zul.mesh.FooterWidget {
	/** Returns the listbox that this belongs to.
	 * @return Listbox
	 */
	public getListbox(): zul.sel.Listbox | null | undefined { // FIXME: solve with <parent>
		return this.getMeshWidget() as zul.sel.Listbox | null | undefined;
	}

	/** Returns the list header that is in the same column as
	 * this footer, or null if not available.
	 * @return Listheader
	 */
	public getListheader(): zul.sel.Listheader | null | undefined { // FIXME: solve with <parent>
		return this.getHeaderWidget() as zul.sel.Listheader | null | undefined;
	}

	/** Returns the maximal length for this cell.
	 * If listbox's mold is "select", it is the same as
	 * {@link Select#getMaxlength}
	 * If not, it is the same as the correponding {@link #getListheader}'s
	 * {@link Listheader#getMaxlength}.
	 *
	 * <p>Note: {@link Option#getMaxlength} is the same as {@link Select#getMaxlength}.
	 * @return int
	 * @since 5.0.5
	 */
	public getMaxlength(): number | undefined {
		var lc = this.getListheader();
		return lc ? lc.getMaxlength() : 0;
	}

	//@Override
	protected override domLabel_(): string {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	}
}