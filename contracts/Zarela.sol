// SPDX-License-Identifier: GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0 <0.8.0;
import "./ERC20.sol";
import "./SafeMath.sol";
import "./CheckPrice.sol";
import "./ERC20Burnable.sol";
// Initiate Biobit Token With 20M Total Supply And Set Name, Symbol

contract ZarelaSmartContract is ERC20 , PriceConsumer , ERC20Burnable{
    constructor() {
        _mint(msg.sender , 20000000000000000);
    }
    
    using SafeMath for uint;
    
    uint smart_contract_started = block.timestamp;
    uint start_date_monthly= block.timestamp; 
    uint start_date_Daily = block.timestamp;
    uint time_in_month = 5 minutes; // = 18 month
    uint time_in_day = 2 minutes; // 24 hours
    uint total_daily =  14400000000000;  // 14400 token per day
    uint multi_x = 2;  // 1.9
    uint public bank ;

    event OrderRegistered(address owner , uint Order_ID);
    event Contributed(address Contributer , uint Order_ID , address Requester);
    event TokenSent(address Requester, address User, uint amount);
    event OrderFinish(uint Order_ID);
    
    
    struct OrderFile{
        uint Order_ID;
        string Title;
        address Requester_Address_Creator;
        uint Token_Pay;
        uint Instance_Count;
        string White_Paper; //ipfs
        string Description;
        uint Instance_Remains;
        string What_Type; //category
        bool Status;
    }
    
    struct Data{
        uint Order_Number;
        string[] Data;
        address[] Contributer_address;
    }
    
    struct User{
        uint Token_Gained_from_SC;
        uint Token_Gained_from_Requester;
        uint[] orders_contributed;
    }
    
    struct Requester{
        address Requester_Address;
        uint[] Order_Owned;
    }
   
    address[] public Origin_User_Address;
    address[] private Null_User_Address;
    uint public contributer_count;
    uint public sum_of_reward_per_contributer;
    uint[] public reward;
    uint[] private null_reward;
    
    mapping(uint => Data) Data_Map;
    mapping(address=>User)public User_Map;
    mapping(address=>Requester)public Requester_Map;
    OrderFile[]public ord_file;
    
    modifier OnlyRequester(uint _Order_Number){
        OrderFile storage myorder = ord_file[_Order_Number];
        require(myorder.Requester_Address_Creator == msg.sender, "You Are Not Owner");
        _;
    }
    
    modifier CheckID(uint _Order_Number){
        OrderFile storage myorder = ord_file[_Order_Number];
        require(_Order_Number == myorder.Order_ID , "Your ID Is Not Correct");
        _;
    }
    
    modifier Notnull(address _address){
        require(address(0) != _address, "Send to the zero address");
        _;
    }
   

    function SetOrderBoard(string memory _Title,string memory _Description,string memory _White_Paper,uint _Token_Pay,uint _Instance_Count,string memory _Category)public {
        require(_balances[msg.sender] >= (_Token_Pay*_Instance_Count) , "Your Token Is Not Enough");
        ERC20.transfer(address(this),(_Token_Pay*_Instance_Count));
        uint order_id = ord_file.length;
        ord_file.push(OrderFile(order_id,_Title,msg.sender,_Token_Pay,_Instance_Count,_White_Paper,_Description,_Instance_Count,_Category,false));
        Requester_Map[msg.sender].Requester_Address = msg.sender;
        Requester_Map[msg.sender].Order_Owned.push(order_id);
        emit OrderRegistered(msg.sender, order_id);
    }
    
    function SendFile(uint _Order_Number,  address _Requester , string memory _Data)public CheckID(_Order_Number) Notnull(_Requester) {
        require(! ord_file[_Order_Number].Status ,"Order Was Finished");
        require(_Requester ==  ord_file[_Order_Number].Requester_Address_Creator , "Address Requester Is Not True");
        Data_Map[_Order_Number].Order_Number = _Order_Number;
        Origin_User_Address.push(msg.sender);
        Data_Map[_Order_Number].Data.push(_Data);
        Data_Map[_Order_Number].Contributer_address.push(msg.sender);
        getLatestPrice();
        contributer_count ++;
        reward.push(multi_x * LastPrice);
        sum_of_reward_per_contributer +=  multi_x * LastPrice;
        if(block.timestamp > start_date_Daily  + time_in_day){
            start_date_Daily = block.timestamp;
            DailyShare();
        }
        User_Map[msg.sender].orders_contributed.push(_Order_Number);
        emit Contributed(msg.sender , _Order_Number , _Requester);
    }
    
    function DailyShare()internal {
        if(block.timestamp <= start_date_monthly + time_in_month){ //block.timestamp = now
            ShareReward();
        }
        else{
            start_date_monthly = block.timestamp; 
            total_daily = total_daily/2;
            DailyShare();
        }
    }

    function ShareReward()internal {
        if(block.timestamp > 2 days + smart_contract_started ){
            bank = 0 ;
            smart_contract_started = block.timestamp;
        }
        _balances[address(this)] = _balances[address(this)].sub(total_daily);
        bank = total_daily + bank;
        if(sum_of_reward_per_contributer > bank){
            for(uint i ; i<Origin_User_Address.length;i++){
                _balances[Origin_User_Address[i]]  = _balances[Origin_User_Address[i]].add(bank/Origin_User_Address.length);
                User_Map[Origin_User_Address[i]].Token_Gained_from_SC += (bank/Origin_User_Address.length) ;
            }
            bank = 0;
            Origin_User_Address = Null_User_Address;
            contributer_count = 0;
            sum_of_reward_per_contributer = 0;
            reward = null_reward;
        }
        else{
            for(uint i ; i < Origin_User_Address.length ; i++){
                bank -= reward[i];
                _balances[Origin_User_Address[i]] = _balances[Origin_User_Address[i]].add(reward[i]);
                User_Map[Origin_User_Address[i]].Token_Gained_from_SC += reward[i];
            }
            Origin_User_Address = Null_User_Address;
            contributer_count = 0;
            sum_of_reward_per_contributer = 0;
            reward = null_reward;
        }
        
    }

    function ConfirmContributer(uint _Order_Number,address User_Address)public OnlyRequester(_Order_Number) CheckID(_Order_Number) Notnull(User_Address){
        OrderFile storage myorder = ord_file[_Order_Number];
        require(!myorder.Status,"Your Order Is Done, And You Sent All of Rewards to Users");
        _balances[address(this)] = _balances[address(this)].sub(myorder.Token_Pay);
        _balances[User_Address] = _balances[User_Address].add(myorder.Token_Pay);
        User_Map[User_Address].Token_Gained_from_Requester+=myorder.Token_Pay;
        myorder.Instance_Remains = myorder.Instance_Remains.sub(1);
        if (myorder.Instance_Remains == 0){
            myorder.Status = true;
            emit OrderFinish(_Order_Number);
        }
        emit TokenSent(msg.sender,User_Address,myorder.Token_Pay);
    }
    
    function GetOrderFiles(uint _Order_Number)public OnlyRequester(_Order_Number) CheckID(_Order_Number) view returns(string[] memory,address[] memory){
        return(Data_Map[_Order_Number].Data,Data_Map[_Order_Number].Contributer_address);
    }
    
    function OrderSize()public view returns(uint){
        return ord_file.length;
    }
   
}