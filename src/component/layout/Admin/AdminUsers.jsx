import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../../actions/productAction";
import { getAllUsers, deleteUser } from "../../../actions/userAction";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../utils/Loader";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import "./Admin.css";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { users, error, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.users);
  useEffect(() => {
    if (isAuthenticated && isAuthenticated === false) {
      navigate("/login");
    }
    if (user && user?.user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user, isAuthenticated]);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, isDeleted, navigate, deleteError, message]);

  const cols = [
    { field: "id", headerName: "User ID", minwidth: 120, flex: 0.8 },
    { field: "email", headerName: "Email", minwidth: 150, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minwidth: 100,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      minwidth: 100,
      flex: 0.3,
    },

    {
      field: "action",
      headerName: "Action",
      minwidth: 270,
      flex: 0.3,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            {!deleteLoading === true ? (
              <>
                <Link to={`/admin/user/${params.row.id}`}>
                  <Edit />
                </Link>
                <Button
                  disabled={deleteLoading === true}
                  onClick={() => {
                    deleteUserHandler(params.row.id);
                  }}
                >
                  <Delete />
                </Button>
              </>
            ) : (
              <>...</>
            )}
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users?.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });
  return (
    <>
      {" "}
      <div
        className="page"
        style={{ alignItems: "start", justifyContent: "start" }}
      >
        <div
          style={{
            width: "100vw",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 5fr",
            position: "absolute",
            top: "6vmax",
          }}
        >
          <Sidebar />
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="productListContainer">
                <h1
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "2vmax",
                    fontFamily: "sans-serif",
                    fontWeight: "900",
                  }}
                >
                  ALL USERS
                </h1>
                <DataGrid
                  rows={rows}
                  columns={cols}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                  style={{ minHeight: "70vh", width: "99%", margin: "auto" }}
                  autoHeight
                  getRowId={(row) => row.id + "-" + row.MRP}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
