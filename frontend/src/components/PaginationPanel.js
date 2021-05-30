//Component taken from.
//https://github.com/do-community/build-react-pagination-demo
//CHanged look of componed with https://reactstrap.github.io/

import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

class PaginationPanel extends Component {
    constructor(props) {
        super(props);
        let { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

        pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
        totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

        // pageNeighbours can be: 0, 1 or 2
        pageNeighbours =
            typeof pageNeighbours === "number"
                ? Math.max(0, Math.min(pageNeighbours, 2))
                : 0;

        const totalPages = Math.ceil(totalRecords / pageLimit);

        this.state = {
            currentPage: 1,
            totalRecords: totalRecords,
            totalPages: totalPages,
            pageLimit: pageLimit,
            pageNeighbours: pageNeighbours,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.totalRecords !== nextProps.totalRecords) {
            const totalRecords =
                typeof nextProps.totalRecords === "number"
                    ? nextProps.totalRecords
                    : 0;
            const totalPages = Math.ceil(totalRecords / prevState.pageLimit);

            return {
                totalRecords: totalRecords,
                totalPages: totalPages,
            };
        }
        return null;
    }

    componentDidMount() {
        this.gotoPage(1);
    }

    gotoPage = (page) => {
        const { onPageChanged = (f) => f } = this.props;
        const { totalPages, pageLimit, totalRecords } = this.state;

        const currentPage = Math.max(1, Math.min(page, totalPages));

        const paginationData = {
            currentPage,
            totalPages: totalPages,
            pageLimit: pageLimit,
            totalRecords: totalRecords,
        };
        this.setState({ currentPage }, () => onPageChanged(paginationData));
    };

    handleClick = (page) => (evt) => {
        evt.preventDefault();
        this.gotoPage(page);
    };

    handleMoveLeft = (evt) => {
        evt.preventDefault();
        this.gotoPage(
            this.state.currentPage - this.state.pageNeighbours * 2 - 1
        );
    };

    handleMoveRight = (evt) => {
        evt.preventDefault();
        this.gotoPage(
            this.state.currentPage + this.state.pageNeighbours * 2 + 1
        );
    };

    /**
     * Let's say we have 10 pages and we set pageNeighbours to 2
     * Given that the current page is 6
     * The pagination control will look like the following:
     *
     * (1) < {4 5} [6] {7 8} > (10)
     *
     * (x) => terminal pages: first and last page(always visible)
     * [x] => represents current page
     * {...x} => represents page neighbours
     */
    fetchPageNumbers = () => {
        const { currentPage, totalPages, pageNeighbours } = this.state;

        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(
                totalPages - 1,
                currentPage + pageNeighbours
            );

            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = totalPages - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case hasLeftSpill && !hasRightSpill: {
                    const extraPages = range(
                        startPage - spillOffset,
                        startPage - 1
                    );
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case !hasLeftSpill && hasRightSpill: {
                    const extraPages = range(
                        endPage + 1,
                        endPage + spillOffset
                    );
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case hasLeftSpill && hasRightSpill:
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];
        }

        return range(1, totalPages);
    };

    render() {
        const { totalRecords, totalPages } = this.state;

        if (!totalRecords || totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <Pagination>
                {pages.map((page, index) => {
                    if (page === LEFT_PAGE)
                        return (
                            <Pagination.Prev
                                href="#"
                                onClick={this.handleMoveLeft}
                            />
                        );

                    if (page === RIGHT_PAGE)
                        return (
                            <Pagination.Next
                                href="#"
                                onClick={this.handleMoveRight}
                            />
                        );
                    return (
                        <Pagination.Item
                            key={index}
                            active={currentPage === page ? true : false}
                            href="#"
                            onClick={this.handleClick(page)}
                        >
                            {page}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
        );
    }
}

PaginationPanel.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func,
};

export default PaginationPanel;
