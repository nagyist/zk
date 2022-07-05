/* Listcell.ts

	Purpose:

	Description:

	History:
		Thu Apr 30 22:17:54     2009, Created by tomyeh

Copyright (C) 2009 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
function _isListgroup(wgt: zk.Widget): wgt is zkex.sel.Listgroup {
	return zk.isLoaded('zkex.sel') && wgt instanceof zkex.sel.Listgroup;
}
function _isListgroupfoot(wgt: zk.Widget): boolean {
	return zk.isLoaded('zkex.sel') && wgt instanceof zkex.sel.Listgroupfoot;
}
/**
 * A list cell.
 *
 * <p>Default {@link #getZclass}: z-listcell
 */
export class Listcell extends zul.LabelImageWidget<HTMLTableCellElement> {
	// Parent could be null as asserted by `bindChildren_`.
	public override parent!: zul.sel.Listitem | null;
	private _span = 1;

	/** Returns number of columns to span this cell.
	 * Default: 1.
	 * @return int
	 */
	public getColspan = Listcell.prototype.getSpan;

	/** Sets the number of columns to span this cell.
	 * <p>It is the same as the colspan attribute of HTML TD tag.
	 * @param int colspan
	 */
	public setColspan = Listcell.prototype.setSpan;

	// change colspan to span since ZK 10.0.0
	public getSpan(): number {
		return this._span;
	}

	// change colspan to span since ZK 10.0.0
	public setSpan(v: number, opts?: Record<string, boolean>): this {
		const o = this._span;
		this._span = v = Math.max(v, 1);

		if (o !== v || (opts && opts.force)) {
			var n = this.$n();
			if (n) n.colSpan = this._span;
		}

		return this;
	}

	public override setLabel(label: string, opts?: Record<string, boolean>): this {
		super.setLabel(label, opts);
		if (this.desktop) {
			var p: zk.Widget = this.parent!;
			if (_isListgroup(p))
				p.rerender();
			else if (p instanceof zul.sel.Option || p instanceof zul.sel.Optgroup)
				p.updateLabel_();
		}
		return this;
	}

	/** Returns the list box that it belongs to.
	 * @return Listbox
	 */
	public getListbox(): zul.sel.Listbox | null {
		var p = this.parent;
		return p ? p.parent : null;
	}

	//super//
	public override getTextNode(): HTMLElement | null | undefined {
		return jq(this.$n_()).find('>div:first')[0];
	}

	/** Returns the maximal length for this cell.
	 * If listbox's mold is "select", it is the same as
	 * {@link Select#getMaxlength}
	 * If not, it is the same as the correponding {@link #getListheader}'s
	 * {@link Listheader#getMaxlength}.
	 *
	 * <p>Note: {@link Option#getMaxlength} is the same as {@link Select#getMaxlength}.
	 * @return int
	 */
	public getMaxlength(): number | undefined {
		var box = this.getListbox();
		if (!box) return 0;
		if (box.getMold() == 'select') {
			// FIXME: This is likely dead code and Listbox doesn't have getMaxlength.
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// eslint-disable-next-line
			return box.getMaxlength();
		}
		var lc = this.getListheader();
		return lc ? lc.getMaxlength() : 0;
	}

	/** Returns the list header that is in the same column as
	 * this cell, or null if not available.
	 * @return Listheader
	 */
	public getListheader(): zul.sel.Listheader | null | undefined {
		var box = this.getListbox();
		if (box && box.listhead) {
			var j = this.getChildIndex();
			if (j < box.listhead.nChildren)
				return box.listhead.getChildAt<zul.sel.Listheader>(j);
		}
		return null;
	}

	protected override domLabel_(): string {
		return zUtl.encodeXML(this.getLabel(), {maxlength: this.getMaxlength()});
	}

	protected override domContent_(): string {
		var s1 = super.domContent_(),
			s2 = this._colHtmlPre();
		return s1 ? s2 ? s2 + '&nbsp;' + s1 : s1 : s2;
	}

	protected override domClass_(no?: zk.DomClassOptions): string {
		var scls = super.domClass_(no),
			p = this.parent!,
			head = this.getListheader();

		if ((!no || !no.zclass) && (_isListgroup(p) || _isListgroupfoot(p)))
			scls += ' ' + p.$s('inner');
		if (head && !head.isVisible())
			scls += ' ' + this.$s('hidden-header');

		return scls;
	}

	private _colHtmlPre(): string {
		var s = '',
			box = this.getListbox(),
			p = this.parent!;
		if (box != null && p.firstChild == this) {
			var isGrp = _isListgroup(p);
			// insert checkmark
			//B70-ZK-2053:make sure checkmark won't display on multiple listgroup
			if (box.isCheckmark() && !_isListgroupfoot(p)
					&& (!isGrp || (box.groupSelect && box.isMultiple()))) {
				var chkable = p.isSelectable(),
					multi = box.isMultiple();
				s += '<span id="' + p.uuid + '-cm" class="' + p.$s('checkable')
					+ ' ' + (multi ? p.$s('checkbox') : p.$s('radio'));

				if (!chkable || p.isDisabled())
					s += ' ' + p.$s('disabled');

				s += '"';
				if (!chkable)
					s += ' style="visibility:hidden"';

				s += '><i class="' + p.$s('icon') + ' '
					+ (multi ? 'z-icon-check' : 'z-icon-radio') + '"></i></span>';
			}
			// insert toggle icon
			if (_isListgroup(p)) { // For "type predicates" to work, isGrp cannot be used.
				var cls = p._open ?
						p.getIconOpenClass_() + ' ' + p.$s('icon-open') :
						p.getIconCloseClass_() + ' ' + p.$s('icon-close');
				s += '<span id="' + p.uuid + '-img" class="' + p.$s('icon') + '"><i class="' + cls + '"></i></span>';
			}
			if (s) return s;
		}
		return (!this.getImage() && !this.getLabel() && !this.firstChild) ? '&nbsp;' : '';
	}

	protected override doFocus_(evt: zk.Event): void {
		super.doFocus_(evt);
		//sync frozen
		var box = this.getListbox(),
			frozen = box ? box.frozen : null,
			node = this.$n();
		if (frozen && node) // NOTE: non-null frozen implies non-null box
			box!._moveToHidingFocusCell(node.cellIndex);
	}

	protected override doMouseOver_(evt: zk.Event): void {
		var n = this.$n();

		// ZK-2136: all children should apply -moz-user-select: none
		if (n && zk.gecko && (this._draggable || this.parent!._draggable)
				&& !jq.nodeName(evt.domTarget!, 'input', 'textarea')) {
			jq(n).addClass('z-draggable-over');
		}
		super.doMouseOver_(evt);
	}

	protected override doMouseOut_(evt: zk.Event): void {
		var n = this.$n();

		// ZK-2136: all children should apply -moz-user-select: none
		if (n && zk.gecko && (this._draggable || this.parent!._draggable)
				&& !jq.nodeName(evt.domTarget!, 'input', 'textarea')) {
			jq(n).removeClass('z-draggable-over'); // Bug ZK-580
		}
		super.doMouseOut_(evt);
	}

	public override domAttrs_(no?: zk.DomAttrsOptions): string {
		return super.domAttrs_(no)
			+ (this._span > 1 ? ' colspan="' + this._span + '"' : '');
	}

	//-- super --//
	protected override domStyle_(no?: zk.DomStyleOptions): string {
		var style = '',
			head = this.getListheader();
		if (head) {
			if (head._align)
				style += 'text-align:' + head._align + ';';
			if (head._valign)
				style += 'vertical-align:' + head._valign + ';';
			if (!head.isVisible())
				no = zk.copy(no, {visible: true});
		}
		return super.domStyle_(no) + style;
	}

	protected override bindChildren_(desktop?: zk.Desktop, skipper?: zk.Skipper | null, after?: CallableFunction[]): void {
		var p = this.parent;
		if (!p || !(p instanceof zul.sel.Option || p instanceof zul.sel.Optgroup))
			super.bindChildren_(desktop, skipper, after);
	}

	protected override unbindChildren_(skipper?: zk.Skipper | null, after?: CallableFunction[], keepRod?: boolean): void {
		var p = this.parent;
		if (!p || !(p instanceof zul.sel.Option || p instanceof zul.sel.Optgroup))
			super.unbindChildren_(skipper, after, keepRod);
	}

	protected override deferRedrawHTML_(out: string[]): void {
		out.push('<td', this.domAttrs_({domClass: true}), ' class="z-renderdefer"></td>');
	}
}
zul.sel.Listcell = zk.regClass(Listcell);