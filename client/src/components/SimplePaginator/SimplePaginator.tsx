import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useHistory, useLocation } from 'react-router';
import { getUrlParams } from '../../services/global';

type TProps = {
  onPage: (v:number)=>void;
  pages: number;
  forcePage?: number;
}

const SimplePaginator: React.FC<TProps> = ({ onPage = () => { }, pages, forcePage }) => {
  const location = useLocation();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [interval, _] = useState(5);
  const [arrPages, setArrPages] = useState<Array<number>>([]);

  const { page: locationPage } = getUrlParams(location);

  useEffect(() => {
    setCountPages(pages);
    setArrPages(() => {
      const arr = [];
      let arrLength = pages > interval ? interval : pages;
      for (let i = 1; i <= arrLength; i++) {
        arr.push(i);
      }
      return arr;
    });
    if (pages > 1 && !locationPage) {
      history.push(`?page=${1}`);
    }
  }, [pages]);

  useEffect(() => {
    if (!locationPage) {
      setPage(1);
    } else {
      setPage(Number(locationPage));
    }
  }, [location]);

  useEffect(() => {
    setArrPages((_) => {
      const arr = [];
      let correctEnd = 0;
      let correctStart = 0;
      let start = page - 2;

      if (start < 1) {
        correctEnd = 1 + Math.abs(start);
        start = 1;
      }

      let end = page + 2 > countPages ? countPages : page + 2;

      if (end - start < 4 && correctEnd <= 0) {
        correctStart = 1 + Math.abs(end - start - 3);
      }
      end = end + correctEnd;
      start = start - correctStart <= 0 ? 1 : start - correctStart;
      let arrLength = end > countPages ? countPages : end;
      for (let i = start; i <= arrLength; i++) {
        arr.push(i);
      }
      return arr;
    });

    callback(page);

  }, [page]);

  useEffect(() => {
    if (forcePage) {
      handlerClickPage(forcePage);
    }
  }, [forcePage]);

  const callback = (p: number) => {
    if (p <= 0) {
      return;
    }

    if (typeof onPage === 'function') {
      onPage(p);
    }
  }

  const nextPage = () => {
    const p = page + 1;
    if (p > countPages) {
      return;
    }
    history.push(`?page=${p}`);
  };

  const prevPage = () => {
    const p = page - 1;
    if (p < 1) {
      return;
    }
    history.push(`?page=${p}`);
  };

  const handlerClickPage = (p: number) => {
    if (p === page) {
      return;
    }
    history.push(`?page=${p}`);
  }

  return (
    <React.Fragment>
      {pages > 1 ?
        <Pagination>

          <PaginationItem>
            <PaginationLink first onClick={() => handlerClickPage(1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous onClick={prevPage} />
          </PaginationItem>

          {interval < countPages && page > 3 ?
            <React.Fragment>
              <PaginationItem>
                <PaginationLink onClick={() => handlerClickPage(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink disabled>...</PaginationLink>
              </PaginationItem>
            </React.Fragment> :
            null
          }

          {
            arrPages.map((el) => {
              return (
                <PaginationItem key={el} active={el === page ? true : false}>
                  <PaginationLink onClick={() => handlerClickPage(el)}>{el}</PaginationLink>
                </PaginationItem>
              );
            })
          }

          {interval < countPages && page + 2 < countPages ?
            <React.Fragment>
              <PaginationItem>
                <PaginationLink disabled>...</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => handlerClickPage(countPages)}>{countPages}</PaginationLink>
              </PaginationItem>
            </React.Fragment> :
            null
          }

          <PaginationItem>
            <PaginationLink next onClick={nextPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={() => handlerClickPage(countPages)} />
          </PaginationItem>

        </Pagination>
        :
        null
      }
    </React.Fragment>

  );
}

export default SimplePaginator;