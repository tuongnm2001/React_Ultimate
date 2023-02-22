import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation, Trans } from 'react-i18next';

const TableUserPaginate = (props) => {
    const { listUser, pageCount } = props
    const { t } = useTranslation();

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">{t('manage-user.username')}</th>
                        <th scope="col">Email</th>
                        <th scope="col">{t('manage-user.role')}</th>
                        <th>{t('manage-user.handle')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => props.handleShowViewModal(item)}>{t('manage-user.view')}</button>
                                        <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(item)}>{t('manage-user.update')}</button>
                                        <button className="btn btn-danger" onClick={() => props.handleDeleteUser(item)}>{t('manage-user.delete')}</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableUserPaginate;