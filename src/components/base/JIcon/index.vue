<template>
  <component :width="width" :height="height" :is="icon" />
</template>

<script>
import Adjustments from "./icons/Adjustments.vue";
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import Ban from "./icons/Ban.vue";
import Bell from "./icons/Bell.vue";
import Calendar from "./icons/Calendar.vue";
import ChartSquareBar from "./icons/ChartSquareBar.vue";
import ChatAlt from "./icons/ChatAlt.vue";
import Check from "./icons/Check.vue";
import CheckCircle from "./icons/CheckCircle.vue";
import ChevronDoubleLeft from "./icons/ChevronDoubleLeft.vue";
import ChevronDoubleRight from "./icons/ChevronDoubleRight.vue";
import ChevronDown from "./icons/ChevronDown.vue";
import ChevronLeft from "./icons/ChevronLeft.vue";
import ChevronRight from "./icons/ChevronRight.vue";
import ChevronUp from "./icons/ChevronUp.vue";
import Clipboard from "./icons/Clipboard.vue";
import ClipboardCheck from "./icons/ClipboardCheck.vue";
import ClipboardList from "./icons/ClipboardList.vue";
import Clock from "./icons/Clock.vue";
import CloudUpload from "./icons/CloudUpload.vue";
import Cog from "./icons/Cog.vue";
import CreditCard from "./icons/CreditCard.vue";
import CurrencyDollar from "./icons/CurrencyDollar.vue";
import Default from "./icons/Default.vue";
import DocumentDownload from "./icons/DocumentDownload.vue";
import DocumentDuplicate from "./icons/DocumentDuplicate.vue";
import DotsHorizontal from "./icons/DotsHorizontal.vue";
import Download from "./icons/Download.vue";
import Exclamation from "./icons/Exclamation.vue";
import ExclamationCircle from "./icons/ExclamationCircle.vue";
import Eye from "./icons/Eye.vue";
import Home from "./icons/Home.vue";
import LocationMarker from "./icons/LocationMarker.vue";
import LockClosed from "./icons/LockClosed.vue";
import Logout from "./icons/Logout.vue";
import Mail from "./icons/Mail.vue";
import MailOpen from "./icons/MailOpen.vue";
import Menu from "./icons/Menu.vue";
import Minus from "./icons/Minus.vue";
import MinusCircle from "./icons/MinusCircle.vue";
import OfficeBuilding from "./icons/OfficeBuilding.vue";
import PaperAirPlane from "./icons/PaperAirPlane.vue";
import PaperClip from "./icons/PaperClip.vue";
import Pencil from "./icons/Pencil.vue";
import Percent from "./icons/Percent.vue";
import Phone from "./icons/Phone.vue";
import Plus from "./icons/Plus.vue";
import PlusCircle from "./icons/PlusCircle.vue";
import QuestionMark from "./icons/QuestionMark.vue";
import Refresh from "./icons/Refresh.vue";
import Search from "./icons/Search.vue";
import Share from "./icons/Share.vue";
import Template from "./icons/Template.vue";
import ShieldCheck from "./icons/ShieldCheck.vue";
import ShieldDollar from "./icons/ShieldDollar.vue";
import Trash from "./icons/Trash.vue";
import TrashAlt from "./icons/TrashAlt.vue";
import User from "./icons/User.vue";
import UserGroup from "./icons/UserGroup.vue";
import Users from "./icons/Users.vue";
import X from "./icons/X.vue";

export default {
  name: "JIcon",
  props: {
    icon: {
      type: String,
      required: true,
      default: "Default",
    },
    width: {
      type: String,
      default: "24",
    },
    height: {
      type: String,
      default: "24",
    },
  },
  components: {
    Adjustments,
    ArrowLeft,
    ArrowRight,
    Ban,
    Bell,
    Calendar,
    ChartSquareBar,
    ChatAlt,
    Check,
    CheckCircle,
    ChevronDoubleLeft,
    ChevronDoubleRight,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clipboard,
    ClipboardCheck,
    ClipboardList,
    Clock,
    CloudUpload,
    Cog,
    CreditCard,
    CurrencyDollar,
    Default,
    DocumentDownload,
    DocumentDuplicate,
    DotsHorizontal,
    Download,
    Exclamation,
    ExclamationCircle,
    Eye,
    Home,
    LocationMarker,
    LockClosed,
    Logout,
    Mail,
    MailOpen,
    Menu,
    Minus,
    MinusCircle,
    OfficeBuilding,
    PaperAirPlane,
    PaperClip,
    Pencil,
    Percent,
    Phone,
    Plus,
    PlusCircle,
    QuestionMark,
    Refresh,
    Search,
    Share,
    Template,
    ShieldCheck,
    ShieldDollar,
    Trash,
    TrashAlt,
    User,
    UserGroup,
    Users,
    X,
  },
};
</script>
