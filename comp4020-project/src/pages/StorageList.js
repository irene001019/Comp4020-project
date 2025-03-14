import React, { useState, useRef } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import StorageSearchComponent from '../components/StorageSearchComponent';
import {
  List, ListItem, ListItemIcon, ListItemText, 
  Checkbox, IconButton, Typography, Popover,
  FormControlLabel, Box, Divider, Paper, TextField
} from '@mui/material';
import { Delete, ChevronRight, Close, Edit ,ArrowBack,Save,Cancel} from '@mui/icons-material';
import { GiFishbone } from "react-icons/gi";


const StorageList = () => {
    const [items, setItems] = useState([
    { id: 1, name: 'Apple', checked: true, category: 'Fruit', storageType: 'Fridge', purchaseDate: '2025-03-10', expireDate: '2025-03-20', amount: '5', calories: '52' },
    { id: 2, name: 'Chicken thigh', checked: true, category: 'Meat', storageType: 'Freezer', purchaseDate: '2025-03-08', expireDate: '2025-04-08', amount: '2', calories: '209' },
    { id: 3, name: 'Milk', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-12', expireDate: '2025-03-19', amount: '1', calories: '42' },
    { id: 4, name: 'Juice', checked: true, category: 'Beverage', storageType: 'Fridge', purchaseDate: '2025-03-05', expireDate: '2025-03-25', amount: '1', calories: '45' },
    { id: 5, name: 'Cheese', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-01', expireDate: '2025-04-01', amount: '1', calories: '402' },
    { id: 6, name: 'Beet', checked: true, category: 'Vegetable', storageType: 'Fridge', purchaseDate: '2025-03-11', expireDate: '2025-03-18', amount: '3', calories: '43' },
    { id: 7, name: 'Flour', checked: true, category: 'Baking', storageType: 'Pantry', purchaseDate: '2025-02-15', expireDate: '2025-08-15', amount: '1', calories: '364' },
    { id: 8, name: 'Egg', checked: true, category: 'Dairy', storageType: 'Fridge', purchaseDate: '2025-03-09', expireDate: '2025-03-23', amount: '12', calories: '155' },
    { id: 9, name: 'Frozen pizza', checked: true, category: 'Frozen', storageType: 'Freezer', purchaseDate: '2025-03-01', expireDate: '2025-06-01', amount: '1', calories: '266' },
  ]);

  const [selectedButton, setSelectedButton] = useState(-1); 

  const [selectedItem, setSelectedItem] = useState(null); 
  const [editedItem, setEditedItem] = useState({}); 
  const [itemEditMode, setItemEditMode] = useState(false); 

  const [filterAnchorEl, setFilterAnchorEl] = useState(null); 
  const [filterCategory, setFilterCategory] = useState([]); 
  const [filterStorageType, setFilterStorageType] = useState([]); 

  const [detailsAnchorEl, setDetailsAnchorEl] = useState(null); 
  const [editMode, setEditMode] = useState(false); 
  
  const [showSearchPopup, setShowSearchPopup] = useState(false);  
  
  const [wasteItems, setWasteItems] = useState([]); 
  
  const buttonContainerRef = useRef(null);

  const ButtonList = ["Filter", "Search", "Edit"];

  const handleButtonClick = (index, buttonName) => {    
    if (buttonName === 'Filter') {
      const filterButton = buttonContainerRef.current.querySelector('button:nth-child(1)');
      setFilterAnchorEl(filterButton);
      setSelectedButton(index); 
      setEditMode(false);
      setShowSearchPopup(false);
      setDetailsAnchorEl(null);
    } else if (buttonName === 'Edit') {
      setEditMode(!editMode);
      setFilterAnchorEl(null);
      setShowSearchPopup(false);
      setDetailsAnchorEl(null);
      setSelectedButton(editMode ? -1 : index);
    } else if (buttonName === 'Search') {
      setShowSearchPopup(!showSearchPopup);
      setFilterAnchorEl(null);
      setEditMode(false);
      setDetailsAnchorEl(null);
      setSelectedButton(showSearchPopup ? -1 : index);
    }
  };

  const toggleItemCheck = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const showDetails = (item, event) => {
    setSelectedItem(item);
    setDetailsAnchorEl(event.currentTarget);
    setEditedItem({...item});
  };

  const closeDetails = () => {
    setDetailsAnchorEl(null);
    setItemEditMode(false);
  };

  const handleSearchItemClick = (item) => {
    setSelectedItem(item);
    setShowSearchPopup(false);
    setDetailsAnchorEl(items.find(i => i.id === item.id));
    setEditedItem({...item});
  };

  const deleteItem  = (item) => {
    setItems(items.filter(i => i.id !== item.id));
    setDetailsAnchorEl(null);
  };

  const moveToWaste = (item) => {
    setWasteItems([...wasteItems, item]);
    deleteItem(item);
  };

  const toggleItemEditMode = () => {
    if (itemEditMode) {
      setEditedItem({...selectedItem});
    }
    setItemEditMode(!itemEditMode);
  };

  const saveEditedItem = () => {
    setItems(items.map(item => 
      item.id === editedItem.id ? editedItem : item
    ));
    setSelectedItem(editedItem);
    setItemEditMode(false);
  };

  const getFilteredItems = () => {
    if (filterCategory.length === 0 && filterStorageType.length === 0) {
      return items;
    }
    
    return items.filter(item => {
      const categoryMatch = filterCategory.length === 0 || filterCategory.includes(item.category);
      const storageMatch = filterStorageType.length === 0 || filterStorageType.includes(item.storageType);
      return categoryMatch && storageMatch;
    });
  };

  const toggleFilter = (type, value) => {
    if (type === 'category') {
      setFilterCategory(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === 'storageType') {
      setFilterStorageType(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const handleItemChange = (name, value) => {
    setEditedItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const categories = [...new Set(items.map(item => item.category))];
  const storageTypes = [...new Set(items.map(item => item.storageType))];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
     
     
      {/* Header  with Search, Filter, Edit and Popup for Search*/}
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" sx={{ color: 'black', mb: 2 , fontWeight: 'bold'}}>Storage</Typography>
        <div ref={buttonContainerRef}>
          <ButtonGroup items={ButtonList} onButtonClick={handleButtonClick} selectedButton={selectedButton} />
        </div>

        {/* Search Popup */}
        {showSearchPopup && (
          <div style={{ 
            position: 'absolute',
            zIndex: 1000,
            marginTop: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <StorageSearchComponent 
              items={items} 
              onItemClick={handleSearchItemClick} 
            />
          </div>
        )}
      </Box>
      

      {/* Filter Popover with Category and Storage Type Filters */}
      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={() => {
          setFilterAnchorEl(null);
          setSelectedButton(-1);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '11px',
            border: '3px solid ',
            marginTop: '2px',
          },
        }}
      >
        <Paper sx={{ p: 2, width: 250, maxHeight: 400, overflow: 'auto' }}>
          <Typography variant="h6">Category</Typography>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={filterCategory.includes(category)}
                  onChange={() => toggleFilter('category', category)}
                />
              }
              label={category}
            />
          ))}
          
          <Typography variant="h6" sx={{ mt: 2 }}>Storage Type</Typography>
          {storageTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filterStorageType.includes(type)}
                  onChange={() => toggleFilter('storageType', type)}
                />
              }
              label={type}
            />
          ))}
        </Paper>
      </Popover>

      {/* Items List */}
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {getFilteredItems().map((item) => (
          <React.Fragment key={item.id}>
            <ListItem 
              secondaryAction={
                editMode ? (
                  <IconButton 
                    edge="end" 
                    color="error"
                    onClick={(e) => {
                      deleteItem(item);
                    }}
                  >
                    <Delete />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => showDetails(item, e)}>
                    <ChevronRight color="action" />
                  </IconButton>
                )
              }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.checked}
                  onChange={() => toggleItemCheck(item.id)}
                />
              </ListItemIcon>
              <ListItemText 
                primary={item.name}   
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      {/* Item Details Modal */}
       <div style={{
        display:detailsAnchorEl ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}>
          {selectedItem && (
            <Box sx={{ p: 2 }}>
              {/* Header with title and close button */}
              <Box sx={{ 
                display: 'flex', 
                pb: 2,
                mb: 2, 
                color: 'primary.main',  
              }}>
                {/* Back button on the left */}
                <Box sx={{ width: '15%' }}>
                  <IconButton  onClick={itemEditMode ? toggleItemEditMode : closeDetails}>
                    <ArrowBack/>
                  </IconButton>
                </Box>
                
                {/* Title in the center */}
                <Typography variant="h6" sx={{fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                  {itemEditMode ? 
                    <TextField 
                      fullWidth 
                      variant="standard" 
                      value={editedItem.name} 
                      onChange={(e) => handleItemChange('name', e.target.value)}
                      sx={{ input: { textAlign: 'center', fontWeight: 'bold', color: 'primary.main' } }}
                    /> : 
                    selectedItem.name
                  }
                </Typography>
                
                {/* Saveon the right */}
                <Box>
                  {itemEditMode ? (
                    <IconButton onClick={saveEditedItem} color="primary">
                      <Save />
                    </IconButton>
                  ) : (
                    <IconButton onClick={toggleItemEditMode}>
                      <Edit />
                    </IconButton>
                  )}
                </Box>
              </Box>
              
              {/* Item details */}
              <Box sx={{ mb: 2 }}>
                {itemEditMode ? (
                  // Edit mode - show form fields with better layout
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Purchased Date:</Typography>
                      <TextField 
                        type="date" 
                        size="small" 
                        value={editedItem.purchaseDate} 
                        onChange={(e) => handleItemChange('purchaseDate', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Expire Date:</Typography>
                      <TextField 
                        type="date" 
                        size="small" 
                        value={editedItem.expireDate} 
                        onChange={(e) => handleItemChange('expireDate', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Amount:</Typography>
                      <TextField 
                        size="small" 
                        value={editedItem.amount} 
                        type="number"
                        onChange={(e) => handleItemChange('amount', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Category:</Typography>
                      <TextField 
                        select
                        size="small" 
                        value={editedItem.category} 
                        onChange={(e) => handleItemChange('category', e.target.value)}
                        sx={{ width: '65%' }}
                        slotProps={{
                          select: {
                            native: true,
                          },
                        }}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </TextField>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Storage Type:</Typography>
                      <TextField 
                        select
                        size="small" 
                        value={editedItem.storageType} 
                        onChange={(e) => handleItemChange('storageType', e.target.value)}
                        sx={{ width: '65%' }}
                        slotProps={{
                          select: {
                            native: true,
                          },
                        }}
                      >
                        {storageTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </TextField>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ width: '35%', fontWeight: 'bold' }}>Calories:</Typography>
                      <TextField 
                        type="number" 
                        size="small" 
                        value={editedItem.calories} 
                        onChange={(e) => handleItemChange('calories', e.target.value)}
                        sx={{ width: '65%' }}
                      />
                    </Box>
                  </Box>
                ) : (
                 
                  <>
                  
                    <Typography sx={{ mb: 0.5 }}><strong>Purchased Date:</strong> {selectedItem.purchaseDate}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Expire Date:</strong> {selectedItem.expireDate}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Amount: $</strong> {selectedItem.amount}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Category:</strong> {selectedItem.category}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Storage Type:</strong> {selectedItem.storageType}</Typography>
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography sx={{ mb: 0.5 }}><strong>Calories:</strong> {selectedItem.calories} cal</Typography>
                  </>
                )}
              </Box>
              
              {/* Action buttons - only show when not in edit mode */}
              {!itemEditMode && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  mt: 2,
                  pt: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  gap: 4
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton 
                      color="error"
                      onClick={() => deleteItem(selectedItem)}
                      sx={{ border: '1px solid', borderColor: 'error.main', mb: 0.5 }}
                    >
                      <Delete />
                    </IconButton>
                    <Typography variant="caption" color="error.main">Delete</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton 
                      color="warning"
                      onClick={() => moveToWaste(selectedItem)}
                      sx={{ border: '1px solid', borderColor: 'warning.main', mb: 0.5 }}
                    >
                      <GiFishbone />
                    </IconButton>
                    <Typography variant="caption" color="warning.main">Waste</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};

export default StorageList;