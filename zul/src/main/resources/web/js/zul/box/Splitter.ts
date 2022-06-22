/* Splitter.ts

Purpose:

Description:

History:
	Sun Nov  9 17:15:35     2008, Created by tomyeh

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under LGPL Version 2.1 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/

type Fl = [HTMLElement, string];

function _setOpen(wgt, open, opts): void {
	var colps = wgt.getCollapse();
	if (!colps || 'none' == colps) return; //nothing to do

	var nd = wgt.$n('chdex'),
		vert = wgt.isVertical(),
		Splitter = wgt.$class,
		before = colps == 'before',
		sib = before ? Splitter._prev(nd) : Splitter._next(nd),
		sibwgt = zk.Widget.$(sib),
		fd = vert ? 'height' : 'width',
		diff = 0;
	if (sib) {
		if (!open)
			zWatch.fireDown('onHide', sibwgt);

		sibwgt.setDomVisible_(sib, open);
		sibwgt.parent._fixChildDomVisible(sibwgt, open);

		var c = vert && sib.cells.length ? sib.cells[0] : sib;
		diff = zk.parseInt(c.style[fd]);
		if (!before && sibwgt && !sibwgt.nextSibling) {
			var sp = wgt.$n('chdex2');
			if (sp) {
				sp.style.display = open ? '' : 'none';
				diff += zk.parseInt(sp.style[fd]);
			}
		}
	}

	var sib2 = before ? Splitter._next(nd) : Splitter._prev(nd);
	if (sib2) {
		var c = vert && sib2.cells.length ? sib2.cells[0] : sib2,
			sz = c.style[fd];
		//ZK-1879: set width only if it has width originally
		if (sz && sz.indexOf('px') > -1) {
			diff = zk.parseInt(c.style[fd]) + (open ? -diff : diff);
			if (diff < 0) diff = 0;
			c.style[fd] = diff + 'px';
		}
	}
	if (sib && open)
		zUtl.fireShown(sibwgt);
	if (sib2)
		zUtl.fireSized(zk.Widget.$(sib2), -1); //no beforeSize

	wgt._fixNSDomClass();
	wgt._fixbtn();
	wgt._fixszAll();

	if (!opts || opts.sendOnOpen)
		wgt.fire('onOpen', {open: open});
		//if fromServer, opts is true
}
/**
 * An element which should appear before or after an element inside a box
 * ({@link Box}).
 *
 * <p>When the splitter is dragged, the sibling elements of the splitter are
 * resized. If {@link #getCollapse} is true, a grippy in placed
 * inside the splitter, and one sibling element of the splitter is collapsed
 * when the grippy is clicked.
 *
 *
 *  <p>Default {@link #getZclass}: z-splitter.
 *
 */
export class Splitter extends zul.Widget {
    private _collapse = 'none';
    private _open = true;
	private _drag0: zk.Draggable | null = null;
	private _shallClose?: boolean;

    /** Opens or collapses the splitter.
     * Meaningful only if {@link #getCollapse} is not "none".
     * @param boolean open
     * @param Offset opts
     */
    public setOpen(open: boolean, opts?: Record<string, boolean>): this {
        const o = this._open;
        this._open = open;

        if (o !== open || (opts && opts.force)) {
            if (this.desktop)
                _setOpen(this, open, opts);
        }

        return this;
    }

    /** Returns whether it is open (i.e., not collapsed.
     * Meaningful only if {@link #getCollapse} is not "none".
     * <p>Default: true.
     * @return boolean
     */
    public isOpen(): boolean {
        return this._open;
    }

    /** Returns if it is a vertical box.
     * @return boolean
     */
    public isVertical(): boolean {
        var p: null | zk.Widget & Partial<{isVertical}> = this.parent;
        return !p || p.isVertical();
    }

    /** Returns the orient.
     * It is the same as the parent's orientation ({@link Box#getOrient}).
     * @return String
     */
    public getOrient(): string {
        var p: null | zk.Widget & Partial<{getOrient}> = this.parent;
        return p ? p.getOrient() : 'vertical';
    }

    /** Returns the collapse of this button.
     * @return String
     */
    public getCollapse(): string {
        return this._collapse;
    }

    /** Sets the collapse of this button.
     * @param String collapse
     */
    public setCollapse(collapse: string): void {
        if (this._collapse != collapse) {
            var bOpen = this._open;
            if (!bOpen)
                this.setOpen(true, {sendOnOpen: false}); //bug 1939263

            this._collapse = collapse;
            if (this.desktop) {
                this._fixbtn();
                this._fixsz();
            }

            if (!bOpen)
                this.setOpen(false, {sendOnOpen: false});
        }
    }

    //super//
	protected override domClass_(no?: Partial<zk.DomClassOptions>): string {
        var sc = super.domClass_(no);
        if (!no || !no.zclass) {
            sc += ' ' + this.$s('vertical' == this.getOrient() ? 'vertical' : 'horizontal');
        }
        return sc;
    }

	public override setZclass(zclass: string | null): void {
        super.setZclass(zclass);
        if (this.desktop)
            this._fixDomClass(true);
    }

	protected override bind_(desktop?: zk.Desktop | null, skipper?: zk.Skipper | null, after?: CallableFunction[]): void {
		super.bind_(desktop, skipper, after);

        var box: null | zk.Widget & Partial<{_splitterKid; _bindWatch}> = this.parent;
        if (box && !box._splitterKid) box._bindWatch();

        zWatch.listen({onSize: this, beforeSize: this});

        this._fixDomClass();
            //Bug 1921830: if spiltter is invalidated...

        var node = this.$n()!;

        if (!this.$weave) {
            var $btn = jq(this.$n('btn')!);
            $btn.on('click', Splitter.onclick);
        }

        this._fixbtn();

        this._drag0 = new zk.Draggable(this, node, {
            constraint: this.getOrient(),
            ignoredrag: Splitter._ignoresizing,
            ghosting: Splitter._ghostsizing,
            overlay: true,
            zIndex: 12000,
            initSensitivity: 0,
            snap: Splitter._snap,
            endeffect: Splitter._endDrag});

        this._shallClose = !this._open;
            //3086452: we have to close it after onSize
            //3077716: next sibling is not bound yet
    }

	protected override unbind_(skipper?: zk.Skipper | null, after?: CallableFunction[], keepRod?: boolean): void {
        zWatch.unlisten({onSize: this, beforeSize: this});

        var btn;
        if (btn = this.$n('btn')) {
            var $btn = jq(btn);
            $btn.off('click', Splitter.onclick);
        }

        this._drag0!.destroy();
        this._drag0 = null;
		super.unbind_(skipper, after, keepRod);
    }

    /* Fixed DOM class for the enclosing TR/TD tag. */
    private _fixDomClass(inner?: boolean): void {
        var node = this.$n()!,
            p = node.parentNode;
        if (p) {
            var vert = this.isVertical();
            if (vert) p = p.parentNode; //TR
            if (p && (p as HTMLElement).id.endsWith('chdex')) {
	            (p as HTMLElement).className = this.$s('outer');
            }
        }
        if (inner) this._fixbtn();
    }

    protected _fixNSDomClass(): void {
        jq(this.$n()!)[this._open ? 'removeClass' : 'addClass'](this.$s('nosplitter'));
    }

    private _fixbtn(): void {
        var $btn = jq(this.$n('btn')!),
            $icon = jq(this.$n('icon')!),
            colps = this.getCollapse();
        if (!colps || 'none' == colps) {
            $btn.addClass(this.$s('button-disabled'));
            $icon.hide();
        } else {
            var before = colps == 'before';
            if (!this._open) before = !before;

            if (this.isVertical()) {
                jq(this.$n('icon')!).removeClass(before ? 'z-icon-caret-down' : 'z-icon-caret-up')
                    .addClass(before ? 'z-icon-caret-up' : 'z-icon-caret-down');
            } else {
                jq(this.$n('icon')!).removeClass(before ? 'z-icon-caret-right' : 'z-icon-caret-left')
                    .addClass(before ? 'z-icon-caret-left' : 'z-icon-caret-right');
            }
            $btn.removeClass(this.$s('button-disabled'));
            $icon.show();
        }
    }

    protected setBtnPos_(ver?: boolean): void {
        var btn = this.$n('btn')!,
            node = this.$n()!;
        if (ver)
            btn.style.marginLeft = ((node.offsetWidth - btn.offsetWidth) / 2) + 'px';
        else
            btn.style.marginTop = ((node.offsetHeight - btn.offsetHeight) / 2) + 'px';
    }

    private _fixsz(): void {
        if (!this.isRealVisible()) return;

        var node = this.$n()!, pn = node.parentNode;
        if (pn) {
            // B85-ZK-3516: remove width of parent node
	        (pn as HTMLElement).style.width = '';

            if (this.isVertical()) {
                node.style.width = '100%'; // Sandbox-Splitter: the width should be same as parent
                this.setBtnPos_(true);
            } else {
                node.style.height = (zk.webkit ? (pn.parentNode as HTMLElement).clientHeight : (pn as HTMLElement).clientHeight) + 'px';
                    //Bug 1916332: TR's clientHeight is correct (not TD's) in Safari
                this.setBtnPos_();
            }
        }

        if (this._shallClose) { //set in bind_
            delete this._shallClose;
            _setOpen(this, false, {sendOnOpen: false});
        }
    }

    public override onSize(): void {
	    this._fixsz();
    }

    public beforeSize(): void {
        this.$n()!.style[this.isVertical() ? 'width' : 'height'] = '';
        this.$n('btn')!.style[this.isVertical() ? 'margin-left' : 'margin-top'] = '';
    }

    public _fixszAll(): void {
        //1. find the topmost box
        var box;
        for (var p: null | zk.Widget = this; p = p.parent;)
            if (p.$instanceof(zul.box.Box))
                box = p;

        if (box) Splitter._fixKidSplts(box);
        else this._fixsz();
    }

    public static onclick(evt: JQuery.Event): void {
        var wgt: zk.Widget & Partial<{getCollapse; setOpen; _open}> = zk.Widget.$(evt)!,
            colps = wgt.getCollapse();
        if (!colps || 'none' == colps) return; //nothing to do
        wgt.setOpen(!wgt._open);
    }

    //drag
    private static _ignoresizing(draggable: zk.Draggable & {run}, pointer: [number, number], evt: zk.Event): boolean {
        var wgt: zk.Widget & Partial<{_open}> = draggable.control!;
        if (!wgt._open || wgt.$n('icon') == evt.domTarget) return true;

        var run: Partial<{prev; next; prevwgt; nextwgt; z_offset}> = draggable.run = {},
            node = wgt.$n(),
            nd = wgt.$n('chdex')!;
        run.prev = Splitter._prev(nd);
        run.next = Splitter._next(nd);
        if (!run.prev || !run.next) return true; // splitter as first or last child
        run.prevwgt = wgt.previousSibling;
        run.nextwgt = wgt.nextSibling;
        run.z_offset = zk(node).cmOffset();
        return false;
    }

    private static _ghostsizing(draggable: zk.Draggable, ofs: number[], evt: zk.Event): HTMLElement {
        var $node = zk(draggable.node!.parentNode);
        jq(document.body).append(
            '<div id="zk_ddghost" class="z-splitter-ghost" style="font-size:0;line-height:0;background:#AAA;position:absolute;top:'
            + ofs[1] + 'px;left:' + ofs[0] + 'px;width:'
            + $node.offsetWidth() + 'px;height:' + $node.offsetHeight()
            + 'px;"></div>');
        return jq('#zk_ddghost')[0];
    }

    private static _endDrag(draggable: zk.Draggable & {run}): void {
        var wgt: zk.Widget & Partial<{isVertical; _fixszAll; getCollapse}> = draggable.control!,
            vert = wgt.isVertical(),
            flInfo = Splitter._fixLayout(wgt),
            bfcolps = 'before' == wgt.getCollapse(),
            run = draggable.run, diff;

        if (vert) {
            diff = run.z_point[1];

            //We adjust height of TD if vert
            if (run.next && run.next.cells.length) run.next = run.next.cells[0];
            if (run.prev && run.prev.cells.length) run.prev = run.prev.cells[0];
        } else {
            diff = run.z_point[0];
        }
        //B70-ZK-2514: make runNext always the same block with the dragging direction, ex. drag to up, up is runNext
        var runNext = run.next, runPrev = run.prev, runNextWgt = run.nextwgt, runPrevWgt = run.prevwgt;
        if (diff < 0) {
            runNext = run.prev;
            runPrev = run.next;
            diff = -diff;
            bfcolps = !bfcolps;
        }

        if (!diff) return; //nothing to do


        //B70-ZK-2514: assign fd to each block separately and count on clientFd in the end
        if (runNext && runPrev)
            Splitter._doDragEndResize(vert, [runNextWgt, runPrevWgt], runPrev, runNext, diff, bfcolps);

        Splitter._unfixLayout(flInfo);
            //Stange (not know the cause yet): we have to put it
            //befor _fixszAll and after onSize

        wgt._fixszAll();
            //fix all splitter's size because table might be with %
        draggable.run = null;//free memory
    }

    protected static _doDragEndResize(
        vert: boolean,
        wgts: zk.Widget[],
        runPrev: HTMLElement,
        runNext: HTMLElement,
        diff: number,
        bfcolps: boolean
    ): void {
        var upperFdArr: string[] = [],
            hflexReset: boolean[] = [],
            vflexReset: boolean[] = [],
            fdArr = ['width', 'height'];

        for (var i = 0; i < 2; i++) {
            upperFdArr[i] = fdArr[i].charAt(0).toUpperCase() + fdArr[i].slice(1);
        }
        var upperFd = vert ? upperFdArr[1] : upperFdArr[0],
            s = runNext['client' + upperFd],
            s2 = runPrev['client' + upperFd],
            totalFd = s + s2;

        //F70-ZK-112: clear flex once splitter is moved, that is, make splitter resizeable
        for (var i = 0, w; i < 2; i++) {
            if (w = wgts[i]) {
                if (w.getHflex()) {
                    w.setHflex('false');
                    hflexReset[i] = true;
                }
                if (w.getVflex()) {
                    w.setVflex('false');
                    vflexReset[i] = true;
                }
                zWatch.fireDown('_preBeforeSizeReadOnly', w);
                zWatch.fireDown('beforeSize', w);
            }
        }

        s -= diff;
        if (s < 0) s = 0;
        var minusS = totalFd - s,
            fd = vert ? fdArr[1] : fdArr[0];
        runNext.style[fd] = s + 'px';
        runPrev.style[fd] = minusS + 'px';

        if (!bfcolps)
            runNext.style.overflow = 'hidden';
        else
            runPrev.style.overflow = 'hidden';

        for (var i = 0, w; i < 2; i++) {
            w = wgts[i];
            if (w && hflexReset[i]) {
                w['set' + upperFdArr[0]]('100%');
            }
            if (w && vflexReset[i]) {
                w['set' + upperFdArr[1]]('100%');
            }
            zUtl.fireSized(w, -1); //no beforeSize
        }

        var nextClientFd = runNext['client' + upperFd],
            prevClientFd = totalFd - nextClientFd;
        if (nextClientFd != s)
            runNext.style[fd] = nextClientFd + 'px'; //count on clientFd
        if (prevClientFd != minusS)
            runPrev.style[fd] = prevClientFd + 'px'; //count on clientFd
    }

    protected static _snap(draggable: zk.Draggable & Partial<{run}>, pos: [number, number]): [number, number] {
        var run = draggable.run,
            wgt: zk.Widget & Partial<{isVertical}> = draggable.control!,
            x = pos[0], y = pos[1];
        if (wgt.isVertical()) {
            if (y <= run.z_offset[1] - run.prev.offsetHeight) {
                y = run.z_offset[1] - run.prev.offsetHeight;
            } else {
                var max = run.z_offset[1] + run.next.offsetHeight - wgt.$n()!.offsetHeight;
                if (y > max) y = max;
            }
        } else {
            if (x <= run.z_offset[0] - run.prev.offsetWidth) {
                x = run.z_offset[0] - run.prev.offsetWidth;
            } else {
                var max = run.z_offset[0] + run.next.offsetWidth - wgt.$n()!.offsetWidth;
                if (x > max) x = max;
            }
        }
        run.z_point = [x - run.z_offset[0], y - run.z_offset[1]];

        return [x, y];
    }

	protected static _next(n: HTMLElement): HTMLElement {
        return jq(n).next().next()[0];
    }

    protected static _prev(n: HTMLElement): HTMLElement {
        return jq(n).prev().prev()[0];
    }

    protected static _fixKidSplts(wgt: null | zk.Widget & Partial<{isVisible; _fixsz}>): void {
        if (wgt && wgt.isVisible()) { //n might not be an element
            if (wgt instanceof Splitter)
                wgt._fixsz();

            for (wgt = wgt.firstChild; wgt; wgt = wgt.nextSibling)
                Splitter._fixKidSplts(wgt);
        }
    }

	private static _fixLayout(wgt: zk.Widget): Fl | boolean | void {
		if (!zk.opera) {
			return false;
		}
		var box = wgt.parent!.$n()!;
		if (box.style.tableLayout != 'fixed') {
			var fl: Fl = [box, box.style.tableLayout];
			box.style.tableLayout = 'fixed';
			return fl;
		}
	}

	private static _unfixLayout(fl: Fl | boolean | void): void | boolean {
		if (!zk.opera) {
			return false;
		}
		if (fl) fl[0].style.tableLayout = fl[1];
	}
}

zul.box.Splitter = zk.regClass(Splitter);