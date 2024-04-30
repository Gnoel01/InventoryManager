import React, { useEffect, useState } from "react";


const Dashboard = ({ setAuth }) => {
  
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);     
    const [itemIdToDelete, setItemIdToDelete] = useState("");

         // calling inventory
//   const [inv, setInv] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8081/inventory')
//     .then(response => response.json())
//     .then(data => {
    
//         console.log("Complete Inventory", data)
//         setInv(data)
// })
// }, []);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:8081/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllItems = async () => {
    try {
        const response = await fetch("http://localhost:8081/items/all", {
            method: "GET",
            headers: { jwt_token: localStorage.token }
        });
        const parseRes = await response.json();
        setItems(parseRes);
    } catch (err) {
        console.error(err.message);
    }
};

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
     
    } catch (err) {
      console.error(err.message);
    }
  };

  const createItem = async (itemName, itemDescription, itemQuantity) => {
    try {
        const body = { name: itemName, description: itemDescription, quantity: itemQuantity };
        const response = await fetch("http://localhost:8081/items/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                jwt_token: localStorage.token
            },
            body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        setItems(prevItems => [...prevItems, parseRes]);
        // Redirect to inventory list after item creation
       // window.location.href = "/inventory";
    } catch (err) {
        console.error(err.message);
    }
};
const deleteItem = async (itemId) => {
    try {
        await fetch(`http://localhost:8081/items/delete/${itemId}`, {
            method: "DELETE",
            headers: {
                jwt_token: localStorage.token
            }
        });
        setItems(items.filter(item => item.id !== itemId));
        // Redirecting to the inventory list after deletion
       // window.location.href = "/inventory";
    } catch (err) {
        console.error(err.message);
    }
};

    // Function to handle adding items
    const handleAddItemSubmit = async (e) => {
        e.preventDefault();
        await createItem(itemName, itemDescription, itemQuantity);
        setItemName("");
        setItemDescription("");
        setItemQuantity(0);
    };
    // Function to handle deleting items
    const handleDeleteItemSubmit = async (e) => {
        e.preventDefault();
        await deleteItem(itemIdToDelete);
        setItemIdToDelete("");
    };



  useEffect(() => {
    getProfile();
    getAllItems();
  }, []);

  return (
    <div>
    <h1 className="mt-5">Dashboard</h1>
    <h2>Welcome {name}</h2>
    <button onClick={e => logout(e)} className="btn btn-primary">
      Logout
    </button>
            {/* Form for adding items */}
            <form onSubmit={handleAddItemSubmit}>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Item Description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Item Quantity"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                />
                <button type="submit">Add Item</button>
            </form>
            {/* Form for deleting items */}
            <form onSubmit={handleDeleteItemSubmit}>
                <input
                    type="text"
                    placeholder="Item ID to Delete"
                    value={itemIdToDelete}
                    onChange={(e) => setItemIdToDelete(e.target.value)}
                />
                <button type="submit">Delete Item</button>
            </form>
            {/* Optionally, render the items */}
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description} - Quantity: {item.quantity}
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
            {Array.isArray(inv) && (
                <ul>
                    {inv.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.description} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
  );
};

export default Dashboard;