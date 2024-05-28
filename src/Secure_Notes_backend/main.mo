import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

actor {

  var currentId: Nat64 = 0;

  public type Data = {
    Id : Nat64;
    Title: Text;
    Content: Text;
    DateAndTime: Text;
    creator: Principal;
  };

  var data: [Data] = [];

  public shared ({ caller }) func GetPrincipal() : async Principal {
    return caller;
  };

  public shared ({ caller }) func InsertData(details: Data) : async Nat64 {
    let newData = {
      Id = currentId;
      Title = details.Title;
      Content = details.Content;
      DateAndTime = details.DateAndTime;
      creator = caller;
    };
    data := Array.append<Data>(data, [newData]);
    currentId += 1;
    return newData.Id;
  };

  public shared query func getAllContent() : async [Data] {
    return data;
  };

  public shared query func getDataById(Id: Nat64) : async ?Data {
    return Array.find<Data>(data, func x = x.Id == Id);
  };

  public shared func deleteDataById(Id: Nat64) : async Text {
    let originalLength = Array.size(data);
    data := Array.filter<Data>(data, func x = x.Id != Id);
    if (Array.size(data) < originalLength) {
      return "deleted successfully";
    } else {
      return "id not found";
    }
  };

  public shared func DeleteEntireData() : async Text {
    data := [];
    return "Successfully Deleted";
  };

  public shared query func getDataByPrincipal(creator: Principal) : async [Data] {
    return Array.filter<Data>(data, func x = x.creator == creator);
  };

};
