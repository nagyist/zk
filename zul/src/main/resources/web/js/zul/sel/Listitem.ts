/* Listitem.ts

	Purpose:

	Description:

	History:
		Thu Apr 30 22:17:40     2009, Created by tomyeh

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
function _isPE(): boolean {
	return zk.isLoaded('zkex.sel');
}
// _dragImg changed to an array, update image node after original DD_dragging
function updateImg(drag: zk.Draggable): void {
	var dragImg = drag._dragImg as JQuery | undefined;
	if (dragImg) {
		// update drag image
		var allow = jq(drag.node).hasClass('z-drop-allow');
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (var len = 0; len < dragImg.length; len++) {
			if (allow)
				jq(dragImg[len]).removeClass('z-icon-times').addClass('z-icon-check');
			else
				jq(dragImg[len]).removeClass('z-icon-check').addClass('z-icon-times');
		}
	}
}
/**
 * A listitem.
 *
 * <p>Default {@link #getZclass}: z-listitem
 */
@zk.WrapClass('zul.sel.Listitem')
export class Listitem extends zul.sel.ItemWidget {
	// Parent could be null as asserted by `getListgroup`.
	override parent!: zul.sel.Listbox | undefined;
	override nextSibling!: zul.sel.Listitem | undefined;
	override previousSibling!: zul.sel.Listitem | undefined;
	override firstChild!: zul.sel.Listcell | undefined;
	override lastChild!: zul.sel.Listcell | undefined;

	/** Returns the list box that it belongs to.
	 * @return Listbox
	 */
	getListbox(): zul.sel.Listbox | undefined {
		return this.parent;
	}

	/**
	 * Returns the listgroup that this item belongs to, or null.
	 * @return zkex.sel.Listgroup
	 */
	getListgroup(): zkex.sel.Listgroup | undefined {
		// TODO: this performance is not good.
		if (_isPE() && this.parent && this.parent.hasGroup())
			for (var w: zul.sel.Listitem | undefined = this; w; w = w.previousSibling)
				if (w instanceof zkex.sel.Listgroup)
					return w;

		return undefined;
	}

	/** Sets the label of the {@link Listcell} it contains.
	 *
	 * <p>If it is not created, we automatically create it.
	 * @param String label
	 */
	setLabel(label: string): this {
		this._autoFirstCell().setLabel(label);
		return this;
	}

	// replace the origional DD_dragging
	override getDragOptions_(map: zk.DraggableOptions): zk.DraggableOptions {
		var old = map.change!;
		map.change = function (drag, pt, evt) {
			old(drag, pt, evt);
			// update drag image after origional function
			updateImg(drag);
		};
		return super.getDragOptions_(map);
	}

	/** Sets the image of the {@link Listcell} it contains.
	 *
	 * <p>If it is not created, we automatically create it.
	 * @param String image
	 */
	setImage(image: string): this {
		this._autoFirstCell().setImage(image);
		return this;
	}

	_autoFirstCell(): zul.sel.Listcell {
		if (!this.firstChild)
			this.appendChild(new zul.sel.Listcell());
		return this.firstChild!; // guaranteed to exists because appended in the previous line
	}

	//super//
	override domStyle_(no?: zk.DomStyleOptions): string {
		if (_isPE() && (this instanceof zkex.sel.Listgroup || this instanceof zkex.sel.Listgroupfoot)
				|| (no && no.visible))
			return super.domStyle_(no);

		var style = super.domStyle_(no),
			group = this.getListgroup();
		return group && !group.isOpen() ? style + 'display:none;' : style;
	}

	override domClass_(no?: zk.DomClassOptions): string {
		var cls = super.domClass_(no),
			list = this.getListbox(),
			sclass: string;
		// NOTE: The following `this.$n()` could be null. This behavior is verified on old code.
		if (list && jq(this.$n()).hasClass(sclass = list.getOddRowSclass()))
			return cls + ' ' + sclass;
		return cls;
	}

	override replaceWidget(newwgt: zul.sel.Listitem, skipper?: zk.Skipper): void {
		this._syncListitems(newwgt);
		super.replaceWidget(newwgt, skipper);
	}

	override scrollIntoView(): this {
		var bar = this.getListbox()!._scrollbar;
		if (bar) {
			bar.syncSize();
			bar.scrollToElement(this.$n_());
		} else {
			super.scrollIntoView();
		}
		return this;
	}

	_syncListitems(newwgt: zul.sel.Listitem): void {
		var box: zul.sel.Listbox | undefined;
		if (box = this.getListbox()) {
			if (box.firstItem!.uuid == newwgt.uuid)
				box.firstItem = newwgt;
			if (box.lastItem!.uuid == newwgt.uuid)
				box.lastItem = newwgt;

			var items = box._selItems, b1, b2;
			if (b1 = this.isSelected())
				items.$remove(this);
			if (b2 = newwgt.isSelected())
				items.push(newwgt);
			if (b1 != b2)
				box._updHeaderCM();
		}
	}

	//@Override
	override compareItemPos_(item: zul.sel.Listitem): number {
		var thisIndex = this._index!, itemIndex = item._index!;
		return thisIndex == itemIndex ? 0 : thisIndex > itemIndex ? -1 : 1;
	}

	//@Override
	override shallFireSizedLaterWhenAddChd_(): boolean {
		if (this.getListbox()!._model == 'group' as unknown) { // FIXME: inconsistent type
			zWatch.listen({
					onCommandReady: this
			});
			return true;
		}
		super.shallFireSizedLaterWhenAddChd_();
		return false;
	}

	// ZK-3733
	onCommandReady(ctl: zk.ZWatchController): void {
		zUtl.fireSized(this);
		zWatch.unlisten({
			onCommandReady: this
		});
	}
}