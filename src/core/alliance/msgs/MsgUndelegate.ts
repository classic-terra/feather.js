import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUndelegate as MsgUndelegate_pb } from '@terra-money/terra.proto/alliance/tx';

/**
 * A delegator can undelegate an amount of bonded alliance tokens
 * form the x/alliance module, and will begin the unbonding process
 * for those funds. The unbonding process takes 21 days to complete,
 * during which the Luna cannot be transacted or swapped.
 */
export class MsgUndelegate extends JSONSerializable<
  MsgUndelegate.Amino,
  MsgUndelegate.Data,
  MsgUndelegate.Proto
> {
  /**
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount alliance assets to be undelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromAmino(
    data: MsgUndelegate.Amino,
    _?: boolean
  ): MsgUndelegate {
    _;
    const {
      value: { delegator_address, validator_address, amount },
    } = data;

    return new MsgUndelegate(
      delegator_address,
      validator_address,
      Coin.fromAmino(amount)
    );
  }

  public toAmino(_?: boolean): MsgUndelegate.Amino {
    _;
    const { delegator_address, validator_address, amount } = this;
    return {
      type: 'alliance/MsgUndelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgUndelegate.Proto,
    _?: boolean
  ): MsgUndelegate {
    _;
    return new MsgUndelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(_?: boolean): MsgUndelegate.Proto {
    _;
    const { delegator_address, validator_address, amount } = this;
    return MsgUndelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/alliance.alliance.MsgUndelegate',
      value: MsgUndelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUndelegate {
    _;
    return MsgUndelegate.fromProto(MsgUndelegate_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgUndelegate.Data, _?: boolean): MsgUndelegate {
    _;
    const { delegator_address, validator_address, amount } = data;
    return new MsgUndelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(_?: boolean): MsgUndelegate.Data {
    _;
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/alliance.alliance.MsgUndelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgUndelegate {
  export interface Amino {
    type: 'alliance/MsgUndelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/alliance.alliance.MsgUndelegate';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgUndelegate_pb;
}
