import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDelegate as MsgDelegate_pb } from '@terra-money/terra.proto/alliance/tx';

/**
 * A delegator can submit this message to send more alliance assets
 * to be staked through the alliance module in a validator.
 */
export class MsgDelegate extends JSONSerializable<
  MsgDelegate.Amino,
  MsgDelegate.Data,
  MsgDelegate.Proto
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount amount of alliance assets to be sent for delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(data: MsgDelegate.Amino, _?: boolean): MsgDelegate {
    _;
    const {
      value: { delegator_address, validator_address, amount },
    } = data;

    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(_?: boolean): MsgDelegate.Amino {
    _;
    const { delegator_address, validator_address, amount } = this;
    return {
      type: 'alliance/MsgDelegate',
      value: {
        delegator_address: delegator_address,
        validator_address: validator_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromProto(proto: MsgDelegate.Proto, _?: boolean): MsgDelegate {
    _;
    return new MsgDelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgDelegate.Proto {
    _;
    const { delegator_address, validator_address, amount } = this;
    return MsgDelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgDelegate',
      value: MsgDelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgDelegate {
    _;
    return MsgDelegate.fromProto(MsgDelegate_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgDelegate.Data, _?: boolean): MsgDelegate {
    _;
    const { delegator_address, validator_address, amount } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgDelegate.Data {
    _;
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/alliance.alliance.MsgDelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgDelegate {
  export interface Amino {
    type: 'alliance/MsgDelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgDelegate';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgDelegate_pb;
}
