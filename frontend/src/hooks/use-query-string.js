import qs from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const useQueryString = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryPush = (query) => {
    const currentQuery = qs.parse(searchParams.toString());
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          ...query,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    navigate(url);
  };

  return queryPush;
};

export default useQueryString;